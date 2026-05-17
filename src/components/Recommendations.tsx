import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

const RECOMMENDATIONS = [
  {
    title: "Organic Quinoa & Kale Bowl",
    tag: "High Protein",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    desc: "Perfect for post-workout recovery with plant-based proteins."
  },
  {
    title: "Grilled Salmon with Asparagus",
    tag: "Omega-3 Rich",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop",
    desc: "Lean protein paired with fiber-rich greens for metabolic health."
  },
  {
    title: "Avocado & Seed Sourdough",
    tag: "Healthy Fats",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    desc: "Sustained energy from complex carbs and essential fatty acids."
  }
];

export function Recommendations() {
  return (
    <section id="recommendations" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
           <div>
             <div className="flex items-center gap-2 text-brand-sage text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-[1px] bg-brand-sage/30" />
              Prescribed Selections
            </div>
             <h2 className="text-5xl md:text-7xl font-serif text-brand-green italic leading-[0.8]">Curated Meals</h2>
           </div>
           <button className="hidden md:flex items-center gap-3 text-brand-green font-black uppercase text-[10px] tracking-[0.3em] group">
             Full Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {RECOMMENDATIONS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] oval-mask overflow-hidden mb-10 shadow-[0_30px_60px_-15px_rgba(26,46,34,0.1)]">
                 <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" alt={item.title} />
                 <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
                 <div className="absolute top-8 left-8">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.25em] text-brand-green shadow-xl">
                      {item.tag}
                    </span>
                 </div>
              </div>
              <div className="space-y-3 px-2">
                <h3 className="text-2xl font-serif text-brand-green italic leading-tight group-hover:text-brand-sage transition-colors">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
