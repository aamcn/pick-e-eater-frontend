/*
    Reusable filter function for 'filterSelectedDinerMeals'.
    If the 'optionArray' argument does not include the mealValue argument the mealValue argument is returned.
  */

export function filterFunction(optionArray, mealValue) {
  if (!optionArray.includes(mealValue)) return mealValue;
}

/*
    Function filters 'selectedDinerMeals' by passing each meal through 'filterFunction'.
    Each filter passes an 'optionArray' and 'mealValue' through 'filterFunction'. If the 'optionArray' does
    not include the 'mealValue' for all three filters, the 'meal' is added to 'filteredArray'.
  */
export function filterSelectedDinersMeals(
  selectedDinersMeals,
  checkedDifficulties,
  checkedMealTypes,
  checkedMealSubTypes,
  setFilteredMeals,
) {
  const filteredArray = selectedDinersMeals
    .filter((meal) => {
      return filterFunction(checkedDifficulties, meal.difficulty);
    })
    .filter((meal) => {
      return filterFunction(checkedMealTypes, meal.type);
    })
    .filter((meal) => {
      return filterFunction(checkedMealSubTypes, meal.sub_type);
    });
  setFilteredMeals(filteredArray);
}
