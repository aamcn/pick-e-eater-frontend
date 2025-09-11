import "./randomMealsDisplay.scss";

function RandomMealsDisplay({ randomMeals }) {
  //If no meals are found display a message in component.
  if (!randomMeals || randomMeals.length === 0) {
    return (
      <div
        className="randomDisplayContainer"
        data-testid="random-meal-backdrop"
      >
        <p className="randomMealName" data-testid="no-meals-element">
          No meals found
        </p>
      </div>
    );
  }

  console.log(randomMeals);

  //Displays each meal name from the array passed in as props.
  return (
    <div className="randomDisplayContainer" data-testid="random-meal-backdrop">
      {randomMeals.map((meal) => {
        return (
          <p
            className="randomMealName"
            key={meal.id}
            data-testid="random-meal-item"
          >
            {meal}
          </p>
        );
      })}
    </div>
  );
}

export default RandomMealsDisplay;
