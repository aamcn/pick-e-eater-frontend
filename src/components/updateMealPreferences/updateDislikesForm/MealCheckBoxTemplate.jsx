import { useEffect, useState } from "react"

function MealCheckBoxTemplate({meal, chosenDiner, setChosenDislikedMeals, chosenDislikedMeals}){
    

    const [isChecked, setIsChecked] = useState(false)

    const handleCheckedBox = (event) => {
        console.log(event.target.checked)
        if(event.target.checked == true){
          setChosenDislikedMeals(chosenDislikedMeals => [...chosenDislikedMeals, event.target.value])
          setIsChecked(true)
        } else if(event.target.checked == false){
          const filtered = chosenDislikedMeals.filter(meal => {
             if(meal != event.target.value){
                setIsChecked(false)
              return meal
             }
          })
          setChosenDislikedMeals(filtered)
        }
      }

    useEffect(() => {
        if(chosenDiner.dislikes.includes(meal.id)){
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [chosenDiner])

    return(
       <div>
              <label htmlFor={meal.id}>{meal.name}{meal.id}</label>
              <input onChange={handleCheckedBox} name={meal.id} type="checkbox" value={meal.id} checked={isChecked}/>
           </div> 
    )
}

export default MealCheckBoxTemplate;
