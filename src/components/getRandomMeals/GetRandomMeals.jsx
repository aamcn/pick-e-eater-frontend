import { useEffect, useState } from "react";
import RandomMealsDisplay from "./RandomMealsDisplay";

function GetRandonMeals({filteredMeals}){
    const [randomMeals, setRandomMeals] = useState([])
    const [numberOfMeals, setNumberOfMeals] = useState(0)
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const handleGetRandomClick = (event) =>{
        setRandomMeals([])
        for(let i = 0; i < numberOfMeals; i++){
            const mealIndex = getRandomInt(filteredMeals.length -1)
            const meal = filteredMeals[mealIndex]
            setRandomMeals(randomMeals => [...randomMeals, meal.name])
        }
      }

      const handleDayChange = (event) => {
        setNumberOfMeals(event.target.value)
      }

    return(
        <div>
            <input onChange={handleDayChange} type='number' min='1' max='7'/>
            <button onClick={handleGetRandomClick}>Submit</button>

            <div>
              <RandomMealsDisplay randomMeals={randomMeals}/>
            </div>
        </div>
        )
}

export default GetRandonMeals;