import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity, Meal, DailyMetrics, NutritionGoals } from '../types';

interface HealthContextType {
  // Daily Metrics
  todayMetrics: DailyMetrics | null;
  updateMetrics: (metrics: Partial<DailyMetrics>) => Promise<void>;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'userId'>) => Promise<void>;
  deleteActivity: (activityId: string) => Promise<void>;
  
  // Meals
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id' | 'userId'>) => Promise<void>;
  deleteMeal: (mealId: string) => Promise<void>;
  
  // Nutrition Goals
  nutritionGoals: NutritionGoals;
  updateNutritionGoals: (goals: Partial<NutritionGoals>) => Promise<void>;
  
  // Statistics
  getWeeklyStats: () => Promise<any>;
  getTotalCalories: () => number;
  getTotalProtein: () => number;
  getTotalCarbs: () => number;
  getTotalFat: () => number;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const DEFAULT_NUTRITION_GOALS: NutritionGoals = {
  dailyCalories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
  water: 2000,
};

const DEFAULT_METRICS: DailyMetrics = {
  date: new Date().toISOString().split('T')[0],
  steps: 0,
  calories: 0,
  water: 0,
  sleep: 0,
  heartRate: 0,
  distance: 0,
};

export const HealthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todayMetrics, setTodayMetrics] = useState<DailyMetrics>(DEFAULT_METRICS);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>(DEFAULT_NUTRITION_GOALS);

  // Load data from storage on mount
  React.useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      const [metricsData, activitiesData, mealsData, goalsData] = await Promise.all([
        AsyncStorage.getItem('todayMetrics'),
        AsyncStorage.getItem('activities'),
        AsyncStorage.getItem('meals'),
        AsyncStorage.getItem('nutritionGoals'),
      ]);

      if (metricsData) setTodayMetrics(JSON.parse(metricsData));
      if (activitiesData) setActivities(JSON.parse(activitiesData));
      if (mealsData) setMeals(JSON.parse(mealsData));
      if (goalsData) setNutritionGoals(JSON.parse(goalsData));
    } catch (error) {
      console.error('Failed to load health data:', error);
    }
  };

  const updateMetrics = async (metrics: Partial<DailyMetrics>) => {
    try {
      const updated = { ...todayMetrics, ...metrics };
      setTodayMetrics(updated);
      await AsyncStorage.setItem('todayMetrics', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to update metrics:', error);
    }
  };

  const addActivity = async (activity: Omit<Activity, 'id' | 'userId'>) => {
    try {
      const newActivity: Activity = {
        ...activity,
        id: `activity_${Date.now()}`,
        userId: 'current_user', // TODO: Get from auth context
      };

      const updated = [...activities, newActivity];
      setActivities(updated);
      await AsyncStorage.setItem('activities', JSON.stringify(updated));

      // Update calories in metrics
      const newCalories = todayMetrics.calories + activity.calories;
      await updateMetrics({ calories: newCalories });
    } catch (error) {
      console.error('Failed to add activity:', error);
    }
  };

  const deleteActivity = async (activityId: string) => {
    try {
      const activity = activities.find((a) => a.id === activityId);
      if (!activity) return;

      const updated = activities.filter((a) => a.id !== activityId);
      setActivities(updated);
      await AsyncStorage.setItem('activities', JSON.stringify(updated));

      // Update calories in metrics
      const newCalories = Math.max(0, todayMetrics.calories - activity.calories);
      await updateMetrics({ calories: newCalories });
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  const addMeal = async (meal: Omit<Meal, 'id' | 'userId'>) => {
    try {
      const newMeal: Meal = {
        ...meal,
        id: `meal_${Date.now()}`,
        userId: 'current_user', // TODO: Get from auth context
      };

      const updated = [...meals, newMeal];
      setMeals(updated);
      await AsyncStorage.setItem('meals', JSON.stringify(updated));

      // Update calories in metrics
      const newCalories = todayMetrics.calories + meal.calories;
      await updateMetrics({ calories: newCalories });
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };

  const deleteMeal = async (mealId: string) => {
    try {
      const meal = meals.find((m) => m.id === mealId);
      if (!meal) return;

      const updated = meals.filter((m) => m.id !== mealId);
      setMeals(updated);
      await AsyncStorage.setItem('meals', JSON.stringify(updated));

      // Update calories in metrics
      const newCalories = Math.max(0, todayMetrics.calories - meal.calories);
      await updateMetrics({ calories: newCalories });
    } catch (error) {
      console.error('Failed to delete meal:', error);
    }
  };

  const updateNutritionGoals = async (goals: Partial<NutritionGoals>) => {
    try {
      const updated = { ...nutritionGoals, ...goals };
      setNutritionGoals(updated);
      await AsyncStorage.setItem('nutritionGoals', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to update nutrition goals:', error);
    }
  };

  const getWeeklyStats = async () => {
    // TODO: Implement weekly statistics calculation
    return [];
  };

  const getTotalCalories = () => {
    return meals.reduce((sum, meal) => sum + meal.calories, 0);
  };

  const getTotalProtein = () => {
    return meals.reduce((sum, meal) => sum + meal.protein, 0);
  };

  const getTotalCarbs = () => {
    return meals.reduce((sum, meal) => sum + meal.carbs, 0);
  };

  const getTotalFat = () => {
    return meals.reduce((sum, meal) => sum + meal.fat, 0);
  };

  return (
    <HealthContext.Provider
      value={{
        todayMetrics,
        updateMetrics,
        activities,
        addActivity,
        deleteActivity,
        meals,
        addMeal,
        deleteMeal,
        nutritionGoals,
        updateNutritionGoals,
        getWeeklyStats,
        getTotalCalories,
        getTotalProtein,
        getTotalCarbs,
        getTotalFat,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within HealthProvider');
  }
  return context;
};
