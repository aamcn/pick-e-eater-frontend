import "./mealResultsDisplay.scss";
import PropTypes from "prop-types";

function MealResultsDisplay({ filteredMeals }) {
  // If there are no meals in the filteredMeals array, display a message indicating that no meals were found.
  if (filteredMeals.length === 0) {
    return <p>No meals found</p>;
  }

  return (
    <div className="mealDisplayContainer" data-testid="meal-results-container">
      <ul className="mealDisplay" data-testid="meal-results-list">
        {filteredMeals &&
          filteredMeals.map((meal) => {
            return (
              <li className="mealCard" key={meal.id}>
                <h4 className="mealTitle">{meal.name}</h4>
                <p className="typesContainer">
                  {meal.type} | {meal.sub_type} | {meal.difficulty}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

MealResultsDisplay.propTypes = {
  filteredMeals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      sub_type: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MealResultsDisplay;
