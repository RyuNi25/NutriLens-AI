import React from 'react';
import { UserProfile, ActivityLevel, DietGoal } from '../types';
import { motion } from 'motion/react';
import { Settings, User, Scale, Ruler, Calendar, Heart } from 'lucide-react';

interface ProfileSettingsProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
}

export function ProfileSettings({ profile, onChange }: ProfileSettingsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...profile,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    });
  };

  return (
    <div className="bento-card max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-green p-2 rounded-xl"><Settings className="w-5 h-5 text-white" /></div>
        <h3 className="text-2xl font-bold font-serif text-brand-green">Biological Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <User className="w-3 h-3" /> Full Name
          </label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Calendar className="w-3 h-3" /> Age
          </label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Scale className="w-3 h-3" /> Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Ruler className="w-3 h-3" /> Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Heart className="w-3 h-3" /> Diet Goal
          </label>
          <select
            name="dietGoal"
            value={profile.dietGoal}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          >
            <option value="maintenance">Maintenance</option>
            <option value="cutting">Cutting (Weight Loss)</option>
            <option value="bulking">Bulking (Muscle Gain)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
             Activity Level
          </label>
          <select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Highly Active</option>
            <option value="very_active">Athlete Pro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
             Blood Type
          </label>
          <select
            name="bloodType"
            value={profile.bloodType}
            onChange={handleChange}
            className="w-full bg-brand-cream border-2 border-transparent focus:border-brand-sage focus:outline-none p-3 rounded-xl font-medium transition-all"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>
    </div>
  );
}
