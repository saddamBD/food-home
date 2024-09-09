"use client";

import { useState, ChangeEvent } from "react";
import { fetchMeals } from "@/utils/fetchMeals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Meal } from "@/types/meal";

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]); // meals is an array of Meal objects
  const [query, setQuery] = useState<string>(""); // query is a string
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null); // selectedMeal can be a Meal or null
  const [loading, setLoading] = useState<boolean>(false); // loading is a boolean

  // Function to handle the search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const fetchedMeals = await fetchMeals(query); // Fetch meals based on the query
      setMeals(fetchedMeals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to show details of the selected meal
  const handleShowDetails = (meal: Meal) => {
    setSelectedMeal(meal);
  };

  // Handle input change (for better type safety)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search for Meals</h1>
      <div className="flex mb-4">
        <Input
          placeholder="Enter meal name"
          value={query}
          onChange={handleInputChange}
          className="w-full mr-2"
        />
        <Button onClick={handleSearch} isLoading={loading}>
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals && meals.length > 0 ? (
          meals.map((meal) => (
            <Card key={meal.idMeal}>
              <CardHeader className="text-lg font-semibold">
                {meal.strMeal}
              </CardHeader>
              <CardContent>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded"
                  width={50}
                  height={50}
                />
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleShowDetails(meal)}>
                      Show Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {selectedMeal && (
                      <>
                        <DialogHeader>
                          <DialogTitle>{selectedMeal.strMeal}</DialogTitle>
                          <DialogDescription>
                            <Image
                              src={selectedMeal.strMealThumb}
                              alt={selectedMeal.strMeal}
                              className="w-full h-48 object-cover rounded mb-4"
                              width={50}
                              height={50}
                            />
                            <p>
                              <strong>Category:</strong>{" "}
                              {selectedMeal.strCategory}
                            </p>
                            <p>
                              <strong>Area:</strong> {selectedMeal.strArea}
                            </p>
                            <p className="mt-4">
                              <strong>Instructions:</strong>{" "}
                              {selectedMeal.strInstructions}
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No meals found</p>
        )}
      </div>
    </div>
  );
}
