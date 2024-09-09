// utils/fetchMeals.ts
import { Meal } from '@/types/meal';

export const fetchMeals = async (meal: string): Promise<Meal[]> => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
  if (!res.ok) {
    throw new Error('Failed to fetch meals');
  }
  const data = await res.json();
  return data.meals || [];
};
