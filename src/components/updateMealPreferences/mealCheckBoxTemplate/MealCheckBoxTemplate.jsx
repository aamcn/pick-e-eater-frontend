import { useEffect, useState } from "react";

function MealCheckBoxTemplate({
  meal,
  selectedDiner,
  setDinerDislikedMeals,
  dinerDislikedMeals,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedBox = (event) => {
    /*
      If target checkbox checked status is true, the checkbox value (a meal id) is inserted in 
      the array in chosenDislikedMeals. setIsChecked is set to true which 'checks' the clicked
      checkbox.
    */
    if (event.target.checked == true) {
      setIsChecked(true);
      setDinerDislikedMeals((dinerDislikedMeals) => [
        ...dinerDislikedMeals,
        event.target.value,
      ]);
    }

    /*
      If target checkbox checked status is false, the checkbox value (a meal id) is filtered from 
      the array in chosenDislikedMeals. setIsChecked is set to 'false' which 'un-checks' the clicked
      checkbox.
    */
    if (event.target.checked == false) {
      setIsChecked(false);
      setDinerDislikedMeals(
        dinerDislikedMeals.filter((mealId) => {
          mealId != event.target.value ? meal : null;
        }),
      );
    }
  };

  /* 
    On render and when chosenDiner is changed; 
    If the meal.id is present the 'diners.dislikes' array 'isChecked' is set to 'true' making the checkbox display as'ticked'.
    If not present 'isChecked' is set to 'false' making the checkbox display as 'un-ticked'.
  */
  useEffect(() => {
    if (selectedDiner.dislikes.includes(meal.id)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectedDiner]);

  return (
    <div className="dislikeMealCheckbox"
    data-testid="meal-checkbox">
      <label htmlFor={meal.id}>{meal.name}</label>

      <input
        onChange={handleCheckedBox}
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
