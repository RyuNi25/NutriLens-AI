export interface NutritionResult {
  detected_items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  health_score: number;
  recommendations: string;
  timestamp?: number;
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietGoal: 'cutting' | 'maintenance' | 'bulking';
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
}

export type ActivityLevel = UserProfile['activityLevel'];
export type DietGoal = UserProfile['dietGoal'];
