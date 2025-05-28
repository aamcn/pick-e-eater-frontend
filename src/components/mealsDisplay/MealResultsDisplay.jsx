import "./mealResultsDisplay.scss";

function MealResultsDisplay({ meals, filteredMeals }) {
  return (
    <div className="mealDisplayContainer">
      <ul className="mealDisplay">
        {filteredMeals &&
          filteredMeals.map((meal) => {
            return (
              <li className="mealCard" key={meal.id}>
                <h4 className="mealTitle">{meal.name}</h4>
                <p>{meal.type}</p>
                <p>{meal.sub_type}</p>
                <p>{meal.difficulty}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MealResultsDisplay;
