
function RandomMealsDisplay({randomMeals}){

    return(
        <div>
            {randomMeals.map(meal => {
                return <p>{meal}</p>
            })}
        </div>
    )
}

export default RandomMealsDisplay;