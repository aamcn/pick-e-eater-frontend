import { useEffect, useState } from "react";
import { validateAndSetCheckboxState } from "./utilities/validateAndSetCheckboxState/validateAndSetCheckboxState";
import { updateMealCheckedState } from "./utilities/updateDinerDislikedMeals/updateDinerDislikedMeals";

function MealCheckBoxTemplate({
  meal,
  selectedDiner,
  setDinerDislikedMeals,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedBoxClick = (event) => {
    validateAndSetCheckboxState(event, setIsChecked, setDinerDislikedMeals);
  };

  /* 
    On render and when chosenDiner is changed; 
    If the meal.id is present the 'diners.dislikes' array 'isChecked' is set to 'true' making the checkbox display as'ticked'.
    If not present 'isChecked' is set to 'false' making the checkbox display as 'un-ticked'.
  */
  useEffect(() => {
    updateMealCheckedState(selectedDiner, meal, setIsChecked);  
  }, [selectedDiner]);

  

  return (
    <div className="dislikeMealCheckbox"
    data-testid="meal-checkbox">
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
