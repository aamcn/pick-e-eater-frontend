function MealResultsDisplay({ meals, filteredMeals }) {
  return (
    <>
      <h3>Meals</h3>
      <ol>
        <hr></hr>
        {filteredMeals &&
          filteredMeals.map((meal) => {
            return (
              <li key={meal.id}>
                <p>{meal.name}</p>
                <p>{meal.type}</p>
                <p>{meal.sub_type}</p>
                <p>{meal.difficulty}</p>
                <hr></hr>
              </li>
            );
          })}
      </ol>
    </>
  );
}

export default MealResultsDisplay;
