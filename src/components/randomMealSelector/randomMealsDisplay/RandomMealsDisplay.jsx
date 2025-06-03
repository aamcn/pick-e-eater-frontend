import "./randomMealsDisplay.scss";

function RandomMealsDisplay({ randomMeals }) {
  //Displays each meal from the array passed in as props
  return (
    <div className="randomDisplayContainer">
      {randomMeals.map((meal) => {
        return <p className="randomMealName">{meal}</p>;
      })}
    </div>
  );
}

export default RandomMealsDisplay;
