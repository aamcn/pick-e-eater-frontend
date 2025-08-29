

export function validateAndSetCheckboxState(event, setIsChecked, setDinerDislikedMeals) {
    if (event.target.checked) {
      setIsChecked(true);
      setDinerDislikedMeals((prev) => [...prev, event.target.value]);
    } else {
      setIsChecked(false);
      setDinerDislikedMeals((prev) =>
        prev.filter((mealId) => mealId !== event.target.value)
      );
    }
  }