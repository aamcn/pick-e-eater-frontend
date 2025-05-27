import { useEffect, useState } from "react";

function GetRandonMeals({filteredMeals}){
    const [randomMeals, setRandomMeals] = useState([])
    const [numberOfMeals, setNumberOfMeals] = useState(0)
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const handleRandom = (event) =>{
        setRandomMeals([])
        for(let i = 0; i < numberOfMeals; i++){
            console.log(numberOfMeals)
            const mealIndex = getRandomInt(filteredMeals.length)
            const meal = filteredMeals[mealIndex]
            setRandomMeals(randomMeals => [...randomMeals, meal.name])
        }
      }


      const handleDayChange = (event) => {
        setNumberOfMeals(event.target.value)
      }

      useEffect(() => {
        alert(randomMeals)
      }, [randomMeals])

    return(
        <div>
            <input onChange={handleDayChange} type='number' min='1' max='7'/>
            <button onClick={handleRandom}>Submit</button>
        </div>
        )
}

export default GetRandonMeals;