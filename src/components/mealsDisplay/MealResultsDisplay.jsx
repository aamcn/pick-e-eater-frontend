
function MealResultsDisplay({meals, dislikedMeals}){

    const filteredMeals = meals.filter(meal => {
        if(!dislikedMeals.includes(meal.id)){
            return meal
        }
    })

    return(
        <div>
            <h3>Meals</h3>
            {filteredMeals && filteredMeals.map(meal =>{
                return <p>{meal.name}</p>
            })}
        </div>   
         )
}

export default MealResultsDisplay;