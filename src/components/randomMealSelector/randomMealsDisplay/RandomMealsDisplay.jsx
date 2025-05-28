import "./randomMealsDisplay.scss"

function RandomMealsDisplay({ randomMeals }) {
  //Displays each meal from the array passed in as props
  return (
    <div className='mealDisplayContainer'>
      {randomMeals.map((meal) => {
        return <p>{meal}</p>;
      })}
    </div>
  );
}

export default RandomMealsDisplay;
