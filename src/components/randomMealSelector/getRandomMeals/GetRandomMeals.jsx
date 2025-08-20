import { useState } from "react";
import "./getRandomMeals.scss";
import RandomMealsDisplay from "../randomMealsDisplay/RandomMealsDisplay";
import { getRandomInt } from "../../../modules/getRandomInt/getRandomInt";
import { checkForArrayDuplicates } from "../../../modules/checkForArrayDuplicates/checkForArrayDuplicates";
function GetRandomMeals({ filteredMeals, toggleFormDisplay }) {
  const [randomMeals, setRandomMeals] = useState([]);
  const [numberOfMeals, setNumberOfMeals] = useState(0);


  /*
    When the user clicks the submit button the current random meals are cleared.
    For the total 'numberOfMeals' a random integer is created, this integer is used as the index number 
    to select a meal from the 'filteredMeals' array and add it to the randomMeals array in state.
  */
  const handleGetRandomClick = () => {
    let randomMealsArr = [];
    while (randomMealsArr.length < numberOfMeals) {
      const meal = filteredMeals[getRandomInt(filteredMeals.length - 1)];
      /*
        If the 'meal.name' is already present in 'randomMealsArr' the 'meal.name' is not pushed to the array and a new random 
        index number is generated. 
      */
     //      !randomMealsArr.includes(meal.name) ? randomMealsArr.push(meal.name) : null;
      checkForArrayDuplicates(randomMealsArr, meal.name);
    }
    //Once randomMealsArr.length is equal to the numberOfMeals argument the array is stored in state.
    setRandomMeals(randomMealsArr);
  };

  //When the user changes the input value, the value is stored in state (numberOfMeals).
  const handleDayChange = (event) => {
    setNumberOfMeals(event.target.value);
  };


  return (
    <div className="formBackDrop">
      <div className="randomMealContainer">
        <div className="inputContainer">
          <label>Number of Meals: </label>
          <input
            className="numberOfMealsInput"
            onChange={handleDayChange}
            type="number"
            min="1"
            max="7"
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
          >Close
          </button>
          
          <button
            className="randomMealFormButton"
            onClick={handleGetRandomClick}
          >Randomize!
          </button>
        </div>

      </div>
    </div>
  );
}
export default GetRandomMeals;
