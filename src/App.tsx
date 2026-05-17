import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FoodAnalyzer } from './components/FoodAnalyzer';
import { BentoDashboard } from './components/BentoDashboard';
import { ProfileSettings } from './components/ProfileSettings';
import { Recommendations } from './components/Recommendations';
import { UserProfile, NutritionResult } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { History, LayoutDashboard, User } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Wellness',
  weight: 75,
  height: 180,
  age: 28,
  gender: 'male',
  activityLevel: 'moderate',
  dietGoal: 'maintenance',
  bloodType: 'O+',
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('nutrilens_profile') : null;
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [history, setHistory] = useState<NutritionResult[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('nutrilens_history') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'profile'>('dashboard');

  useEffect(() => {
    localStorage.setItem('nutrilens_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nutrilens_history', JSON.stringify(history));
  }, [history]);

  const handleAnalysisResult = (result: NutritionResult) => {
    setHistory(prev => [result, ...prev]);
    setActiveTab('dashboard');
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear your meal history?')) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-sage selection:text-white pb-20">
      <Header />
      
      <main>
        <Hero />
        <div id="analyzer">
           <FoodAnalyzer onResult={handleAnalysisResult} />
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-24">
           <div className="flex bg-neutral-100/50 p-2 rounded-full w-fit mb-24 glass mx-auto">
             <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-10 py-3 rounded-full flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-brand-green text-brand-cream shadow-2xl' : 'text-neutral-400 hover:text-brand-green'}`}
             >
               <LayoutDashboard className="w-4 h-4" /> Intelligence
             </button>
             <button 
                onClick={() => setActiveTab('history')}
                className={`px-10 py-3 rounded-full flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] transition-all cursor-pointer ${activeTab === 'history' ? 'bg-brand-green text-brand-cream shadow-2xl' : 'text-neutral-400 hover:text-brand-green'}`}
             >
               <History className="w-4 h-4" /> Archives
             </button>
             <button 
                onClick={() => setActiveTab('profile')}
                className={`px-10 py-3 rounded-full flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-brand-green text-brand-cream shadow-2xl' : 'text-neutral-400 hover:text-brand-green'}`}
             >
               <User className="w-4 h-4" /> Biometrics
             </button>
           </div>

           <AnimatePresence mode="wait">
             {activeTab === 'dashboard' && (
               <motion.div
                 key="dashboard"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
               >
                 <BentoDashboard 
                   profile={profile} 
                   history={history} 
                   latestResult={history[0] || null} 
                 />
                 <Recommendations />
               </motion.div>
             )}

             {activeTab === 'profile' && (
               <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
               >
                 <ProfileSettings profile={profile} onChange={setProfile} />
               </motion.div>
             )}

             {activeTab === 'history' && (
               <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
               >
                 <div className="flex items-end justify-between border-b border-brand-beige pb-6">
                    <div>
                        <p className="text-[10px] font-black text-brand-sage uppercase tracking-[0.2em] mb-4">Historical Data</p>
                        <h3 className="text-5xl font-serif text-brand-green italic">The Meal Log</h3>
                    </div>
                    <button onClick={clearHistory} className="text-[10px] font-black text-red-800 hover:opacity-50 uppercase tracking-widest cursor-pointer mb-2">Clear Archives</button>
                 </div>
                 {history.length === 0 ? (
                   <div className="bento-card text-center py-32">
                      <p className="text-neutral-400 font-light italic">No nutritional signatures recorded.</p>
                   </div>
                 ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                      {history.map((item, i) => (
                        <div key={i} className="group cursor-default">
                           {item.imageUrl && (
                             <div className="aspect-[4/3] w-full oval-mask overflow-hidden mb-8 shadow-xl">
                               <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" alt="Result" />
                               <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
                             </div>
                           )}
                           <div className="space-y-4 px-2">
                              <div className="flex justify-between items-baseline">
                                 <h4 className="font-serif italic text-2xl text-brand-green truncate pr-4">{item.detected_items[0] || 'Unknown'}</h4>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300">
                                   {item.timestamp ? new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                                 </span>
                              </div>
                              <div className="flex gap-6 pt-4 border-t border-brand-beige/50">
                                  <div>
                                     <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest mb-1">Energy</p>
                                     <p className="font-bold text-brand-green text-sm">{item.calories} <span className="text-[9px] opacity-40">KCAL</span></p>
                                  </div>
                                  <div>
                                     <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest mb-1">Protein</p>
                                     <p className="font-bold text-brand-green text-sm">{item.protein}<span className="text-[9px] opacity-40 uppercase ml-0.5">G</span></p>
                                  </div>
                                  <div>
                                     <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest mb-1">Score</p>
                                     <p className="font-serif italic text-lg text-brand-sage">{item.health_score}/10</p>
                                  </div>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </main>

      <footer className="py-20 px-6 border-t border-brand-beige bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <h2 className="text-2xl font-serif font-bold text-brand-green italic mb-2 tracking-tight">NutriLens AI.</h2>
              <p className="text-sm text-neutral-400">© 2026 NutriLens. High-Performance Health.</p>
           </div>
           <div className="flex gap-8 text-sm font-bold text-neutral-400">
              <a href="#" className="hover:text-brand-green transition-all">Privacy Policy</a>
              <a href="#" className="hover:text-brand-green transition-all">Terms of Service</a>
              <a href="#" className="hover:text-brand-green transition-all">Wellness Guide</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
