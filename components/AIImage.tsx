
import React, { useEffect, useState } from 'react';
import { getAsset } from '../utils/db.ts';

interface AIImageProps {
  id: number;
}

export const AIImage: React.FC<AIImageProps> = ({ id }) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const asset = await getAsset(id);
        if (mounted) {
          setData(asset);
          setLoading(false);
        }
      } catch (e) {
        console.error("Error loading asset", e);
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);
  
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group">
      {data ? (
        <img 
          src={data} 
          alt={`Content Match Visual ${id}`} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-xl bg-slate-200 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {loading ? 'Accessing Store...' : 'Static Asset Missing'}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
    </div>
  );
};
