import { useState } from "react";
import "./getRandomMeals.scss";
import RandomMealsDisplay from "../randomMealsDisplay/RandomMealsDisplay";

function GetRandonMeals({ filteredMeals, toggleFormDisplay}) {
  const [randomMeals, setRandomMeals] = useState([]);
  const [numberOfMeals, setNumberOfMeals] = useState(0);

  //Returns a random integer between 0 and the passed in argument.
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /*
    When the user clicks the submit button the current random meals are cleared.
    For the total 'numberOfMeals' a random integer is created, this integer is used as the index number 
    to select a meal from the 'filteredMeals' array and add it to the randomMeals array in state.
  */
  const handleGetRandomClick = (event) => {
    setRandomMeals([]);
    for (let i = 0; i < numberOfMeals; i++) {
      const mealIndex = getRandomInt(filteredMeals.length - 1);
      const meal = filteredMeals[mealIndex];
      setRandomMeals((randomMeals) => [...randomMeals, meal.name]);
    }
  };

  //When the user changes the input value, the value is stored in state (numberOfMeals).
  const handleDayChange = (event) => {
    setNumberOfMeals(event.target.value);
  };

  return (
    <div className="formBackDrop">
      <div className="randomMealContainer">
      <div>
        <label>Number of Meals: </label>
        <input onChange={handleDayChange} type="number" min="1" max="7" />
      </div>
      <div>
        <RandomMealsDisplay randomMeals={randomMeals} />
      </div>
      <div>
        <button className="randomMealFormButton" onClick={handleGetRandomClick}>Submit</button>
        <button className="randomMealFormButton" value='randomMealForm' onClick={toggleFormDisplay}>Done</button>
      </div>
    </div>
    </div>
  );
}
export default GetRandonMeals;
