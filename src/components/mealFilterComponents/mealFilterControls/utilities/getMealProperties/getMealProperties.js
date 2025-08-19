/*
    Extract each meals difficulty from the 'allMeals' array.
    Removes duplicates from the array and stores the array of unique strings in the 'difficultyFields' array in state.
*/
export function getMealDifficulties(selectedDinersMeals, setDifficultyFields) {
    const difficultyArr = selectedDinersMeals.map((meal) => {
      return meal.difficulty;
    });
    setDifficultyFields([...new Set(difficultyArr)]);
  }

  /* 
    Extract each meals 'Type' from the 'allMeals' array. 
    Removes duplicate types from the array and stores the array of unique types in the 'mealTypeFields' array in state.
  */
  export function getMealTypes(allMeals, setMealTypeFields) {
    const mealTypeArr = allMeals.map((meal) => {
      return meal.type;
    });
    setMealTypeFields([...new Set(mealTypeArr)]);
  }

  /*
    Extract each meals 'sub_type' from the 'allMeals' array.
    Removes duplicate 'sub_type' from the array and stores the array of unique 'sub_type' in the 'mealSubTypeFields' 
    array in state.
  */
  export function getMealSubTypes(allMeals, setMealSubTypeFields) {
    const subTypeArr = allMeals.map((meal) => {
      return meal.sub_type;
    });
    setMealSubTypeFields([...new Set(subTypeArr)]);
  }