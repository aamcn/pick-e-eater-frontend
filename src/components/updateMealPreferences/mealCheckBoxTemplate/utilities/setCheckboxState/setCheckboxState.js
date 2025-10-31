export function setCheckboxState(event, setIsChecked, setDinerDislikedMeals) {
  if (!event || !event.target || typeof event.target.checked !== "boolean") {
    throw new Error("Invalid event object");
  }
  if (event.target.checked) {
    setIsChecked(true);
    setDinerDislikedMeals((prev) => [...prev, event.target.value]);
  } else {
    setIsChecked(false);
    setDinerDislikedMeals((prev) =>
      prev.filter((mealId) => mealId !== event.target.value),
    );
  }
}
