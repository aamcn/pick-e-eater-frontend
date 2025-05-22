
function MealResultsDisplay({meals, dislikedMeals}){

    const filteredMeals = meals.filter(meal => {
        if(!dislikedMeals.includes(meal.id)){
            return meal
        }
    })

    return(
        <div>
            <h3>Meals</h3>
            <ul>
            <hr></hr>
            {filteredMeals && filteredMeals.map(meal =>{
                return <li key={meal.id}> 
                    <p>{meal.name}</p>
                    <p>{meal.type}</p>
                    <p>{meal.sub_type}</p>
                    <p>{meal.difficulty}</p>  
                    <hr></hr>
                </li>
            })}
            </ul>
        </div>   
         )
}

export default MealResultsDisplay;