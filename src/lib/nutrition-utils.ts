import { UserProfile } from "./types";

export const calculateCalorieTarget = (profile: UserProfile): number => {
  let bmr = 0;
  if (profile.gender === 'male') {
    bmr = 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age);
  } else {
    bmr = 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);
  }

  const activityMultipliers: Record<UserProfile['activityLevel'], number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const maintenance = bmr * activityMultipliers[profile.activityLevel];

  const goalAdjustments: Record<UserProfile['dietGoal'], number> = {
    cutting: -500,
    maintenance: 0,
    bulking: 500,
  };

  return Math.round(maintenance + goalAdjustments[profile.dietGoal]);
};
