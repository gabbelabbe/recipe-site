import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import AddNewRecipe from './components/AddNewRecipe';
import RestClient from './api/RestClient';

const restClient = new RestClient();

export default function SimpleCard() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [recipes, setRecipes] = useState([]);
  const [recipeCards, setRecipeCards] = useState([]);
  const [sentGetRequest, setSentGetRequest] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      if((!!recipes && recipes.length !== 0) || sentGetRequest) {
        setRecipes(recipes.sort(compare));
        setRecipeCards(generateRecipeCards());
      } else {
        const temp = await restClient.getRecipes();
        for(const recipe of temp) {
          recipe.date = await moment(recipe.date);
        }
        setRecipes(temp);
        setSentGetRequest(true);
      }
    }

    getRecipes();
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