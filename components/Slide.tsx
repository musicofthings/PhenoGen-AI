
import React, { useState } from 'react';
import { SlideContent } from '../types';
import { AIImage } from './AIImage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SlideProps {
  slide: SlideContent;
}

export const Slide: React.FC<SlideProps> = ({ slide }) => {
  const [formState, setFormState] = useState({ name: '', org: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Saving to Registry:", formState);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const renderVisual = () => {
    if (slide.visualType === 'form') return null;
    
    // Slide 2: Clear, high-impact clinical photography, no graph
    if (slide.id === 2) {
       return (
        <div className="h-full w-full">
          <AIImage id={slide.id} />
        </div>
       );
    }

    if (slide.visualType === 'chart' && slide.stats) {
       return (
         <div className="h-full flex flex-col space-y-4">
           <div className="flex-1 min-h-[200px] bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={slide.stats}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                 />
                 <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                   {slide.stats.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color?.includes('blue') ? '#2563eb' : '#f43f5e'} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
           <div className="h-48 md:h-64 flex-shrink-0">
             <AIImage id={slide.id} />
           </div>
         </div>
       );
    }

    return (
      <div className="h-full w-full">
        <AIImage id={slide.id} />
      </div>
    );
  };

  if (slide.visualType === 'form') {
    return (
      <div className="w-full flex flex-col lg:flex-row gap-12 items-start py-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-black text-slate-900 font-medical tracking-tight leading-tight">{slide.title}</h1>
          <p className="text-xl text-slate-500 font-light max-w-md leading-relaxed">Join our mission to eliminate the diagnostic odyssey for the next generation of children.</p>
          <div className="pt-8 space-y-5">
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">📍</div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global HQ</div>
                  <div className="text-sm font-semibold text-slate-800">Bangalore, India</div>
                </div>
             </div>
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">📧</div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Investor Relations</div>
                  <div className="text-sm font-semibold text-slate-800">founders@phenogen.ai</div>
                </div>
             </div>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md">
          {submitted ? (
            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] text-center shadow-2xl space-y-4 animate-in fade-in zoom-in duration-500">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">✓</div>
               <h3 className="text-2xl font-bold text-slate-900">Interest Logged</h3>
               <p className="text-slate-500 text-sm leading-relaxed">Your details have been saved to our secure investor registry.</p>
               <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">Send New Entry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-6">
               <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="Dr. Sarah Chen" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Organization</label>
                    <input required value={formState.org} onChange={e => setFormState({...formState, org: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="Sequoia Capital" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                    <input required type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="sarah@firm.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Brief Interest</label>
                    <textarea required rows={3} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none" placeholder="Seeking Pilot info..." />
                  </div>
               </div>
               <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                 {isSubmitting ? 'Submitting...' : 'Request Access'}
               </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8 flex-shrink-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-medical leading-[1.15]">
          {slide.title}
        </h1>
        <div className="flex items-center space-x-3 mt-4">
            <div className="h-1 w-10 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
            <h2 className="text-lg font-semibold text-slate-400 italic uppercase tracking-widest">{slide.subtitle}</h2>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 min-h-0">
        <div className="flex flex-col space-y-8 overflow-y-auto pr-6 custom-scrollbar pb-12">
          <ul className="space-y-8">
            {slide.content.map((point, index) => (
              <li key={index} className="flex space-x-5 group items-start">
                <span className="flex-shrink-0 mt-1.5 w-7 h-7 rounded-lg bg-white border border-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px] transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-lg group-hover:shadow-blue-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-xl text-slate-600 leading-relaxed font-normal">
                  {point}
                </p>
              </li>
            ))}
          </ul>

          {slide.stats && slide.visualType !== 'chart' && (
            <div className="grid grid-cols-2 gap-4 pt-6">
              {slide.stats.map((stat, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                  <span className={`text-3xl font-black ${stat.color?.includes('red') ? 'text-rose-500' : 'text-slate-900'}`}>{stat.value}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative min-h-[350px] lg:h-full lg:min-h-0">
          {renderVisual()}
        </div>
      </div>
    </div>
  );
};
