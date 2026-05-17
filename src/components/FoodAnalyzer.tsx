import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NutritionResult } from '../types';

interface FoodAnalyzerProps {
  onResult: (result: NutritionResult) => void;
}

export function FoodAnalyzer({ onResult }: FoodAnalyzerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Content: string) => {
    setIsUploading(true);
    try {
      const base64Data = base64Content.split(',')[1];
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      onResult({ ...data, timestamp: Date.now(), imageUrl: base64Content });
      // Short delay for success animation before cleanup
      setTimeout(() => setPreview(null), 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  return (
    <section id="analyzer" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-brand-sage text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-4 h-4 rounded-full border border-brand-sage/30 flex items-center justify-center">
                 <span className="w-1 h-1 bg-brand-sage rounded-full" />
              </span>
              Optical Interface
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-green italic">Nutrient Capture</h2>
          </div>
          <p className="text-neutral-400 max-w-xs text-sm leading-relaxed">
            Upload imagery for instant molecular breakdown and performance scoring.
          </p>
        </div>

        <div 
          onClick={triggerUpload}
          className={`
            relative group overflow-hidden bg-white/40 hover:bg-white/60 p-2 rounded-[3.5rem] 
            transition-all duration-700 cursor-pointer border border-brand-green/5
            ${isUploading ? 'pointer-events-none' : ''}
          `}
        >
          <div className="bg-brand-cream/50 rounded-[3rem] border-2 border-dashed border-brand-beige p-16 md:p-24 text-center transition-all duration-700 group-hover:border-brand-sage">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-8 py-4"
                >
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-green/5">
                    {preview && <img src={preview} className="w-full h-full object-cover opacity-50 contrast-125 grayscale" alt="Scan preview" />}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-1 bg-brand-green shadow-[0_0_20px_rgba(26,46,34,0.5)] z-20"
                    />
                    <div className="absolute inset-0 bg-brand-green/10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black text-brand-green uppercase tracking-[0.4em]">Decoding...</p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Molecular Mapping in Progress</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                >
                  <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-green/20 group-hover:scale-110 transition-transform duration-500">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-serif text-brand-green mb-3">Begin Optical Scan</h3>
                  <p className="text-neutral-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed uppercase tracking-tighter">
                    Drag and drop or select high-resolution imagery
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-300">
                     <span className="px-4 py-2 border border-brand-beige rounded-full">Portion Scaling</span>
                     <span className="px-4 py-2 border border-brand-beige rounded-full">Macro Detection</span>
                     <span className="px-4 py-2 border border-brand-beige rounded-full">Bio-Scoring</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
