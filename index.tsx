import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { SLIDES } from './constants.ts';
import { Slide } from './components/Slide.tsx';
import { ChevronLeft, ChevronRight, LayoutGrid, Monitor } from './components/Icon.tsx';
import { ViewMode } from './types.ts';
import { GoogleGenAI } from "@google/genai";
import { getAsset, saveAsset, getBakedCount, initDB, clearAllAssets } from './utils/db.ts';
import { AIImage } from './components/AIImage.tsx';

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('present');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionProgress, setProvisionProgress] = useState(0);
  const [hasBakedAssets, setHasBakedAssets] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>(["Initializing Build Pipeline..."]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAssets = async () => {
      try {
        await initDB();
        const bakedCount = await getBakedCount();
        if (bakedCount >= SLIDES.length) {
          setHasBakedAssets(true);
        }
      } catch (e) {
        console.error("Asset check failed", e);
      }
    };
    checkAssets();
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [buildLogs]);

  const addLog = (msg: string) => {
    setBuildLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const bakeStaticAssets = async () => {
    // 1. Check for API Key selection (Mandatory for high-fidelity models)
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
    if (!hasKey) {
      addLog("ACTION REQUIRED: Please select an API Key from a paid GCP project.");
      await (window as any).aistudio?.openSelectKey();
    }

    setIsProvisioning(true);
    addLog("Connecting to PhenoGen Engine (Gemini 3 Pro Image)...");
    
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];
      addLog(`Processing Artifact ${slide.id}: ${slide.title.substring(0, 20)}...`);
      
      const existing = await getAsset(slide.id);
      if (existing) {
        addLog(`Artifact ${slide.id} found in local store. Skipping.`);
        setProvisionProgress(i + 1);
        continue;
      }

      try {
        addLog(`Synthesizing visual for Slide #${slide.id}...`);
        
        // Re-instantiate to ensure we pick up the latest API Key from the selection dialog
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: slide.imagePrompt }],
          },
          config: {
            imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
          },
        });

        const parts = response.candidates?.[0]?.content?.parts;
        const part = parts?.find(p => p.inlineData);
        if (part?.inlineData) {
          await saveAsset(slide.id, `data:image/png;base64,${part.inlineData.data}`);
          addLog(`Success: Artifact #${slide.id} stored securely.`);
        } else {
          addLog(`Warning: No image data in response for #${slide.id}. Retrying...`);
          i--;
          continue;
        }
      } catch (e: any) {
        const errorMsg = e.message || "";
        console.error("API Error during provisioning:", e);

        if (errorMsg.includes("403") || errorMsg.includes("Permission") || errorMsg.includes("caller does not have permission")) {
          addLog("CRITICAL: Permission Denied (403). Ensure you selected a key from a PAID GCP project.");
          addLog("Triggering re-selection dialog...");
          await (window as any).aistudio?.openSelectKey();
          setIsProvisioning(false);
          return;
        }
        
        if (errorMsg.includes("Requested entity was not found")) {
          addLog("CRITICAL: Resource not found. Resetting API key context...");
          await (window as any).aistudio?.openSelectKey();
          i--; 
          continue;
        }

        addLog(`ERROR: Provisioning failed for slide ${slide.id}. Cooling down (2s)...`);
        await new Promise(r => setTimeout(r, 2000));
        i--;
        continue;
      }
      setProvisionProgress(i + 1);
    }
    
    addLog("Deployment Build Complete. Unlocking Deck UI.");
    setTimeout(() => {
      setIsProvisioning(false);
      setHasBakedAssets(true);
    }, 1000);
  };

  const resetBuild = async () => {
    if (confirm("Reset local artifact store? This will delete all 20 pre-rendered clinical assets.")) {
      await clearAllAssets();
      window.location.reload();
    }
  };

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlideIndex(index);
        setIsTransitioning(false);
      }, 250);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'present' && hasBakedAssets) {
        if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, viewMode, hasBakedAssets]);

  if (!hasBakedAssets) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-mono text-blue-400">
        <div className="max-w-2xl w-full space-y-10">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-[0_0_30px_rgba(37,99,235,0.4)]">Φ</div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">PhenoGen AI: Deployment Pipeline</h1>
              <p className="text-blue-500/60 text-xs mt-1 uppercase tracking-widest font-bold">Static Asset Provisioning System v3.1</p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-3xl p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-50"></div>
            
            {!isProvisioning ? (
              <div className="py-8 space-y-8">
                <div className="space-y-3">
                   <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    To ensure zero-latency clinical visuals during the presentation, we must pre-render the 20 slide assets using Gemini 3 Pro.
                  </p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold border border-slate-700/50 rounded-lg px-3 py-1 inline-block">Requires Paid API Access</p>
                </div>
                <button 
                  onClick={bakeStaticAssets}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] active:scale-95 border border-blue-400/20"
                >
                  START PROVISIONING SEQUENCE
                </button>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-xs text-blue-500 hover:text-blue-400 underline transition-colors">Setup Billing Information</a>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                 <div className="h-64 overflow-y-auto pr-4 space-y-2 text-[10px] custom-scrollbar bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                    {buildLogs.map((log, i) => (
                      <div key={i} className={`${i === buildLogs.length - 1 ? 'text-blue-200' : 'text-slate-500'} border-l border-slate-700 pl-3 py-0.5`}>
                        {log}
                      </div>
                    ))}
                    <div ref={logEndRef} />
                 </div>

                 <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-blue-500">
                      <span>Syncing Medical Artifacts</span>
                      <span className="text-white text-lg">{Math.round((provisionProgress / SLIDES.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        style={{ width: `${(provisionProgress / SLIDES.length) * 100}%` }}
                      />
                    </div>
                 </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest px-4">
            <span className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span>Encrypted Store</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Cloud Engine Ready</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      <header className="px-8 py-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-[100] bg-white/80 backdrop-blur-xl">
        <div className="flex items-center space-x-5">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">Φ</div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">PhenoGen</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em]">Clinical Presentation Deck</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setViewMode(viewMode === 'present' ? 'grid' : 'present')}
            className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-slate-100"
          >
            {viewMode === 'present' ? <LayoutGrid className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            <span>{viewMode === 'present' ? 'Grid Overview' : 'Present Mode'}</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="p-3 rounded-2xl border border-slate-200 hover:bg-white disabled:opacity-20 transition-all shadow-sm active:scale-95">
              <ChevronLeft className="w-5 h-5 text-slate-900" />
            </button>
            <div className="px-5 py-2.5 bg-slate-900 rounded-2xl text-white font-mono text-xs font-bold shadow-xl border border-slate-800">
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </div>
            <button onClick={nextSlide} disabled={currentSlideIndex === SLIDES.length - 1} className="p-3 rounded-2xl border border-slate-200 hover:bg-white disabled:opacity-20 transition-all shadow-sm active:scale-95">
              <ChevronRight className="w-5 h-5 text-slate-900" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative flex flex-col p-6 md:p-12 lg:px-24 overflow-y-auto">
        {viewMode === 'present' ? (
          <div className={`w-full max-w-[1400px] mx-auto transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-y-8 scale-[0.98] blur-sm' : 'opacity-100 translate-y-0 scale-100 blur-0'}`}>
            <Slide slide={SLIDES[currentSlideIndex]} />
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-center max-w-[1400px] mx-auto px-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Slide Repository</h2>
              <button onClick={resetBuild} className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-600 hover:text-white transition-all">Clear All Cached Assets</button>
            </div>
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-4">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => { setCurrentSlideIndex(idx); setViewMode('present'); }}
                  className={`group relative text-left bg-white rounded-[2.5rem] border-2 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 ${currentSlideIndex === idx ? 'border-blue-600 ring-8 ring-blue-50 shadow-2xl' : 'border-slate-100'}`}
                >
                  <div className="aspect-[16/10] bg-slate-50 border-b border-slate-50 relative overflow-hidden">
                    <AIImage id={slide.id} />
                    <div className="absolute top-6 left-6 text-[10px] font-black text-slate-900 font-mono tracking-widest bg-white/80 px-2 py-1 rounded-md shadow-sm">PHG_#{String(idx+1).padStart(2, '0')}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-lg font-black text-slate-900 line-clamp-2 leading-tight mb-3 group-hover:text-blue-600 transition-colors">{slide.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{slide.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {viewMode === 'present' && (
        <div className="px-8 pb-10 sticky bottom-0 bg-gradient-to-t from-[#fcfdfe] via-[#fcfdfe] to-transparent pt-10">
           <div ref={scrollRef} className="flex space-x-5 overflow-x-auto pb-6 no-scrollbar max-w-[1400px] mx-auto">
             {SLIDES.map((s, i) => (
               <button
                 key={s.id}
                 onClick={() => goToSlide(i)}
                 className={`flex-shrink-0 w-32 h-20 rounded-[1.25rem] border-2 transition-all flex flex-col items-center justify-center space-y-2 relative overflow-hidden ${currentSlideIndex === i ? 'border-blue-600 bg-white shadow-2xl ring-4 ring-blue-50 shadow-blue-100' : 'border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200'}`}
               >
                 <span className={`text-[10px] font-black tracking-widest ${currentSlideIndex === i ? 'text-blue-600' : 'text-slate-400'}`}>{String(i+1).padStart(2, '0')}</span>
                 <div className={`h-1 rounded-full transition-all duration-500 ${currentSlideIndex === i ? 'w-10 bg-blue-600' : 'w-4 bg-slate-200'}`}></div>
               </button>
             ))}
           </div>
        </div>
      )}

      <footer className="h-1 bg-slate-100/50 relative">
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(37,99,235,0.6)]" 
          style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }} 
        />
      </footer>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

const rootContainer = document.getElementById('root');
if (rootContainer) {
  const root = createRoot(rootContainer);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
