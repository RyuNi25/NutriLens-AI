import { motion } from "motion/react";
import { ArrowRight, Sparkles, Utensils, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-48 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 text-brand-sage text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="w-8 h-[1px] bg-brand-sage/30" />
            Bio-Intelligence System
          </div>
          <h1 className="text-7xl md:text-[9rem] font-serif font-black leading-[0.85] text-brand-green mb-10 tracking-tighter">
            Elevate <br />
            <span className="italic font-normal">Natural</span> Wellness
          </h1>
          <p className="text-xl text-neutral-500 max-w-lg mb-12 leading-relaxed font-light">
            A specialized vision model designed for precise nutritional decoding. 
            Real-time biometric alignment for the high-performance individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#analyzer" className="bg-brand-green text-brand-cream px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-brand-green/20 text-center">
              Initialize Analysis
            </a>
            <button className="px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest border border-brand-green/10 hover:bg-white transition-all text-neutral-600">
              The Science
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative group">
            <div className="oval-mask overflow-hidden shadow-[0_50px_100px_-20px_rgba(26,46,34,0.15)] relative z-10 aspect-[3/4]">
               <img 
                 src="https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2070&auto=format&fit=crop" 
                 alt="Healthy Food" 
                 className="w-full h-full object-cover animate-slow-pan"
               />
               <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
            </div>
            
            {/* Minimal floating elements */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -right-8 top-1/4 z-20 glass px-6 py-6 rounded-[2rem] shadow-2xl"
            >
               <p className="text-[10px] font-black text-brand-sage uppercase tracking-widest mb-1">Precision</p>
               <p className="text-2xl font-serif text-brand-green italic">99.2%</p>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -left-12 bottom-1/4 z-20 glass px-6 py-6 rounded-[2rem] shadow-2xl"
            >
               <p className="text-[10px] font-black text-brand-sage uppercase tracking-widest mb-1">Response</p>
               <p className="text-2xl font-serif text-brand-green italic">Instant.</p>
            </motion.div>
          </div>

          {/* Editorial background rail */}
          <div className="absolute -right-20 top-0 h-full flex items-center justify-center opacity-10 pointer-events-none">
             <div className="vertical-rail text-brand-green">
               Future of Nutrition • Performance Living • Bio-Intelligence
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
