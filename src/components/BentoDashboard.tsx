import React, { useMemo } from 'react';
import { UserProfile, NutritionResult } from '../types';
import { calculateCalorieTarget } from '../lib/nutrition-utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, Apple, Beef, Brain, Flame, Target, TrendingUp, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  profile: UserProfile;
  history: NutritionResult[];
  latestResult: NutritionResult | null;
}

export function BentoDashboard({ profile, history, latestResult }: DashboardProps) {
  const calorieTarget = useMemo(() => calculateCalorieTarget(profile), [profile]);
  
  const todayHistory = useMemo(() => {
    const today = new Date().setHours(0,0,0,0);
    return history.filter(h => h.timestamp && new Date(h.timestamp).setHours(0,0,0,0) === today);
  }, [history]);

  const stats = useMemo(() => {
    const consumed = todayHistory.reduce((acc, curr) => acc + curr.calories, 0);
    const protein = todayHistory.reduce((acc, curr) => acc + curr.protein, 0);
    const carbs = todayHistory.reduce((acc, curr) => acc + curr.carbs, 0);
    const fat = todayHistory.reduce((acc, curr) => acc + curr.fat, 0);
    return { consumed, protein, carbs, fat, remaining: Math.max(0, calorieTarget - consumed) };
  }, [todayHistory, calorieTarget]);

  const macroData = [
    { name: 'Protein', value: stats.protein, color: '#1A2E22' },
    { name: 'Carbs', value: stats.carbs, color: '#6B705C' },
    { name: 'Fat', value: stats.fat, color: '#A5A58D' },
  ];

  return (
    <section id="dashboard" className="py-32 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 text-brand-sage text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-[1px] bg-brand-sage/30" />
              Active Biometrics
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-green italic leading-[0.8]">Wellness Archive</h2>
          </div>
          <div className="flex gap-4">
             <div className="glass px-8 py-5 rounded-[2rem] border-brand-green/5">
                <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-2">Sync Status</p>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                   <span className="font-bold text-[11px] uppercase tracking-widest text-brand-green">Optimized Flow</span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Main Calorie Progress */}
          <div className="md:col-span-2 lg:col-span-3 bento-card min-h-[400px] flex flex-col justify-between group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-3">
                    <div className="bg-brand-green w-10 h-10 rounded-full flex items-center justify-center"><Flame className="w-5 h-5 text-brand-cream" /></div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Energy Expenditure</h3>
                 </div>
              </div>
              <div className="space-y-4">
                 <p className="text-[10rem] font-serif font-black text-brand-green leading-[0.7] tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left">
                   {stats.consumed}
                 </p>
                 <p className="text-sm font-medium text-neutral-400 italic">Total calories recorded against a {calorieTarget} kcal target.</p>
              </div>
            </div>
            <div className="mt-12 relative z-10">
               <div className="w-full bg-brand-beige/30 h-1 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (stats.consumed / calorieTarget) * 100)}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-brand-green"
                  />
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-green">
                  <span>{Math.round((stats.consumed / calorieTarget) * 100)}% Complete</span>
                  <span>{stats.remaining} KCAL To go</span>
               </div>
            </div>
          </div>

          {/* Macronutrients */}
          <div className="md:col-span-2 lg:col-span-3 bento-card">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <div className="bg-brand-sage/10 w-10 h-10 rounded-full flex items-center justify-center"><Activity className="w-5 h-5 text-brand-sage" /></div>
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Molecular Breakdown</h3>
                </div>
             </div>
             <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Balance</p>
                   <p className="text-2xl font-serif text-brand-green italic">Optimal</p>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-4 mt-8">
                {macroData.map(m => (
                  <div key={m.name} className="p-5 rounded-[2rem] bg-brand-cream/50 border border-brand-green/2">
                    <p className="text-[9px] font-black text-neutral-300 mb-2 uppercase tracking-widest">{m.name}</p>
                    <p className="text-xl font-bold text-brand-green">{m.value}<span className="text-[10px] ml-0.5 text-neutral-400">G</span></p>
                  </div>
                ))}
             </div>
          </div>

          {/* AI Latest Insight */}
          <div className="md:col-span-1 lg:col-span-2 bento-card bg-brand-green text-brand-cream border-none shadow-2xl shadow-brand-green/30">
            <div className="flex items-center gap-3 mb-10">
               <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center"><Brain className="w-5 h-5 text-brand-cream" /></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cream/60">Bio-Analysis</h3>
            </div>
            {latestResult ? (
              <div className="space-y-8">
                 <p className="text-3xl font-serif italic text-brand-cream leading-tight">"{latestResult.recommendations}"</p>
                 <div className="pt-8 border-t border-brand-cream/10">
                    <div className="flex items-center justify-between">
                       <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-cream/40">Nutritional Grade</p>
                       <span className="text-3xl font-serif italic">{latestResult.health_score}<span className="text-sm opacity-30">/10</span></span>
                    </div>
                 </div>
              </div>
            ) : (
              <p className="text-brand-cream/40 text-sm font-light leading-relaxed">System awaiting data capture. Analyze a meal to initialize bio-intelligent feedback.</p>
            )}
          </div>

          {/* Goal Tracking */}
          <div className="md:col-span-1 lg:col-span-2 bento-card group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-10">
                   <div className="bg-neutral-100 w-10 h-10 rounded-full flex items-center justify-center"><Target className="w-5 h-5 text-neutral-800" /></div>
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Program Intent</h3>
                </div>
                <div className="bg-brand-cream rounded-[2rem] p-8 border border-brand-green/5 relative overflow-hidden">
                   <p className="text-[9px] font-black text-brand-sage mb-2 uppercase tracking-widest relative z-10">Primary Objective</p>
                   <p className="text-4xl font-serif text-brand-green italic relative z-10 capitalize">{profile.dietGoal}</p>
                   <p className="text-[9px] font-black text-neutral-300 mt-4 uppercase tracking-widest relative z-10">
                     Est. BMR: {Math.round(calorieTarget * 0.7)} kcal
                   </p>
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                </div>
              </div>
              <div className="bg-brand-green/5 p-4 rounded-2xl mt-4">
                 <p className="text-[9px] font-black text-brand-sage uppercase tracking-widest mb-1">Blood Type Optimization</p>
                 <p className="text-sm font-bold text-brand-green">Type {profile.bloodType} • Profile Synced</p>
              </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2 bento-card flex flex-col justify-between group">
             <div>
                <div className="flex items-center gap-3 mb-8">
                   <div className="bg-neutral-100 w-10 h-10 rounded-full flex items-center justify-center"><Apple className="w-5 h-5 text-neutral-800" /></div>
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Detected Profile</h3>
                </div>
                {latestResult ? (
                  <div className="space-y-2">
                     {latestResult.detected_items.map((item, id) => (
                       <div key={id} className="flex items-center justify-between py-2 border-b border-brand-beige last:border-none">
                         <span className="text-sm font-medium text-brand-green">{item}</span>
                         <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest leading-none">Identified</span>
                       </div>
                     ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400 italic">No recent scan signatures.</p>
                )}
             </div>
          </div>

          {/* Extra Info */}
          <div className="md:col-span-2 lg:col-span-2 bento-card flex flex-col justify-end overflow-hidden relative">
             <div className="absolute inset-0 grayscale contrast-125 opacity-30 group-hover:scale-110 transition-transform duration-1000">
               {latestResult?.imageUrl ? (
                 <img src={latestResult.imageUrl} className="w-full h-full object-cover" alt="Last Food" />
               ) : (
                 <div className="w-full h-full bg-brand-beige/50 flex items-center justify-center">
                   <Beef className="w-20 h-20 text-neutral-200" />
                 </div>
               )}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
             <div className="relative z-10">
                <p className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mb-2">Latest Decoded Signature</p>
                <p className="text-2xl font-serif text-brand-green italic truncate">{latestResult?.detected_items?.[0] || 'Awaiting Input'}</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
