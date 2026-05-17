import { motion } from "motion/react";
import { Leaf } from "lucide-react";

export function Header() {
  return (
    <nav className="fixed top-8 left-0 right-0 z-50 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between glass rounded-full px-8 py-4 backdrop-blur-2xl">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-brand-green w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif font-black text-xl tracking-tighter text-brand-green italic">NutriLens.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
          <a href="#analyzer" className="hover:text-brand-green transition-colors">Analyzer</a>
          <a href="#dashboard" className="hover:text-brand-green transition-colors">Intelligence</a>
          <a href="#recommendations" className="hover:text-brand-green transition-colors">Wellness</a>
        </div>

        <button className="bg-brand-green text-brand-cream px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-lg shadow-brand-green/10">
          Join Exclusive
        </button>
      </div>
    </nav>
  );
}
