export function updateMealCheckedState(selectedDiner, meal, setIsChecked) {
  if (!meal) {
    throw new Error(
      "Invalid arguments provided to updateMealCheckedState, meal is required",
    );
  }
  if (!selectedDiner) {
    throw new Error(
      "Invalid arguments provided to updateMealCheckedState, selectedDiner is required",
    );
  }
  if (!setIsChecked || typeof setIsChecked !== "function") {
    throw new Error("setIsChecked must be a function");
  }
  if (selectedDiner.dislikes.includes(meal.id)) {
    setIsChecked(true);
  } else {
    setIsChecked(false);
  }
}
