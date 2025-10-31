import { useState } from "react";
import "./getRandomMeals.scss";
import RandomMealsDisplay from "../randomMealsDisplay/RandomMealsDisplay";
import { getRandomInt } from "../../../modules/getRandomInt/getRandomInt";
import { filterArrayDuplicates } from "../../../modules/filterArrayDuplicates/filterArrayDuplicates";

function GetRandomMeals({ filteredMeals, toggleFormDisplay }) {
  const [randomMeals, setRandomMeals] = useState([]);
  const [numberOfMeals, setNumberOfMeals] = useState(0);

  /*
    When the user clicks the submit button the current random meals are cleared.
    For the total 'numberOfMeals' a random integer is created, this integer is used as the index number 
    to select a meal from the 'filteredMeals' array and add it to the randomMeals array in state.
  */
  const handleGetRandomMeals = () => {
    let randomMealsArr = [];
    while (randomMealsArr.length < numberOfMeals) {
      const meal = filteredMeals[getRandomInt(filteredMeals.length - 1)];
      // If the 'meal.name' is already present in 'randomMealsArr' the 'meal.name' is not pushed to the array and a new random index number is generated.
      filterArrayDuplicates(randomMealsArr, meal.name);
    }
    //Once randomMealsArr.length is equal to the numberOfMeals argument the array is stored in state.
    setRandomMeals(randomMealsArr);
  };

  //When the user changes the number of meals input value, the value is stored in state (numberOfMeals).
  const numberOfMealsChange = (event) => {
    setNumberOfMeals(event.target.value);
  };

  return (
    <div className="formBackDrop" data-testid="random-meal-form-backdrop">
      <div className="randomMealContainer">
        <div>
          <h4 className="randomMealFormHeader">Random Meals</h4>
        </div>

        <div className="inputContainer">
          <label>Number of Meals: </label>
          <input
            className="numberOfMealsInput"
            onChange={numberOfMealsChange}
            type="number"
            min="1"
            max="7"
            data-testid="number-of-meals-input"
          />
        </div>
        <div>
          <RandomMealsDisplay randomMeals={randomMeals} />
        </div>

        <div className="randomMealFormButtons">
          <button
            className="randomMealFormButton"
            value="randomMealForm"
            onClick={toggleFormDisplay}
          >
            Close
          </button>

          <button
            className="randomMealFormButton"
            onClick={handleGetRandomMeals}
            data-testid="get-random-meals-submit"
          >
            Randomize!
          </button>
        </div>
      </div>
    </div>
  );
}
export default GetRandomMeals;
