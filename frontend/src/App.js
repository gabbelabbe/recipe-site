import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import AddNewRecipe from './components/AddNewRecipe';

export default function SimpleCard() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [recipes, setRecipes] = useState([{
    date: selectedDate,
    foodItem: "Köttbullar med potatismos",
    recipeLink: "#",
    id: 0,
    week: selectedDate.week()
  }])
  const [recipeCards, setRecipeCards] = useState([]);

  useEffect(() => {
    setRecipes(recipes.sort(compare));
    setRecipeCards(generateRecipeCards());
  }, [recipes, selectedDate]);

  const compare = (a, b) => {
    const recipeA = a.date;
    const recipeB = b.date;
  
    let comparison = 0;
    if (recipeA.dayOfYear() < recipeB.dayOfYear() && recipeA.year() <= recipeB.year()) {
      comparison = -1;
    } else if (recipeA.dayOfYear() >= recipeB.dayOfYear() && recipeA.year() >= recipeB.year()) {
      comparison = 1;
    }
    return comparison;
  }

  const generateRecipeCards = () => {
    const tempCards = [];
    for(let i = 0; i < recipes.length; i++) {
      if(recipes[i].week === selectedDate.week()) {
        tempCards.push(<RecipeCard recipeInfo={recipes[i]} key={recipes[i].id} recipes={recipes} setRecipes={setRecipes} />);
      }
    }
    return tempCards;
  }

  return (
    <div>
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {recipeCards}
      <AddNewRecipe recipes={recipes} setRecipes={setRecipes} />
    </div>
  );
}