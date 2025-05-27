function RandomMealsDisplay({ randomMeals }) {
  //Displays each meal from the array passed in as props
  return (
    <div>
      {randomMeals.map((meal) => {
        return <p>{meal}</p>;
      })}
    </div>
  );
}

export default RandomMealsDisplay;
