
export function updateMealCheckedState(selectedDiner, meal, setIsChecked ) {
if (selectedDiner.dislikes.includes(meal.id)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }  
  }