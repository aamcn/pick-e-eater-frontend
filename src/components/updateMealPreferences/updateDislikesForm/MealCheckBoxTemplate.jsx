import { useEffect, useState } from "react";

function MealCheckBoxTemplate({
  meal,
  chosenDiner,
  setChosenDislikedMeals,
  chosenDislikedMeals,
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
      setChosenDislikedMeals((chosenDislikedMeals) => [
        ...chosenDislikedMeals,
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
      setChosenDislikedMeals(
        chosenDislikedMeals.filter((mealId) => {
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
    if (chosenDiner.dislikes.includes(meal.id)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [chosenDiner]);

  return (
    <div className="dislikeMealCheckbox">
      <label htmlFor={meal.id}>{meal.name}</label>

      <input
        onChange={handleCheckedBox}
        name={meal.id}
        type="checkbox"
        value={meal.id}
        checked={isChecked}
      />
    </div>
  );
}

export default MealCheckBoxTemplate;
