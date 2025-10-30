import { useMemo, useState } from "react";
import { updateMealCheckedState } from "./utilities/updateDinerDislikedMeals/updateMealCheckedState";

function MealCheckBoxTemplate({ meal, selectedDiner, setDinerDislikedMeals }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedBoxClick = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
      setDinerDislikedMeals((prev) => [...prev, meal.id]);
    } else {
      setIsChecked(false);
      setDinerDislikedMeals((prev) =>
        prev.filter((mealId) => mealId !== meal.id),
      );
    }
  };

  /* 
    On render and when chosenDiner is changed; 
    If the meal.id is present the 'diners.dislikes' array 'isChecked' is set to 'true' making the checkbox display as'ticked'.
    If not present 'isChecked' is set to 'false' making the checkbox display as 'un-ticked'.
  */
  useMemo(() => {
    updateMealCheckedState(selectedDiner, meal, setIsChecked);
  }, [selectedDiner, meal]);

  return (
    <div className="preference-meal-checkbox" data-testid="meal-checkbox">
      <label htmlFor={meal.id}>{meal.name}</label>

      <input
        onChange={handleCheckedBoxClick}
        name={meal.id}
        type="checkbox"
        value={meal.id}
        checked={isChecked}
        data-testid="meal-checkbox-input"
      />
    </div>
  );
}

export default MealCheckBoxTemplate;
