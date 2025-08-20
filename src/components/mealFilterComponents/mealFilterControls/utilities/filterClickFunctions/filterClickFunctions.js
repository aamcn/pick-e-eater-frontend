//Adds or removes a difficulty from 'checkedDifficulties' depending on whether the checkbox is checked or unchecked.
// If clicked = false, insert the defaultValue (difficulty) into the checkedDifficulties array in state.
//If clicked = true, filter the defaultValue (difficulty) from the checkedDifficulties array and update state.

export function handleDifficultyClick(
  clicked,
  field,
  setCheckedDifficulties,
  checkedDifficulties,
) {
  if(!field || field === null) {
    throw new Error("Field cannot be empty or null");
  }
  if (!clicked)
    setCheckedDifficulties((checkedDifficulties) => [
      ...checkedDifficulties,
      field,
    ]);
  if (clicked) {
    setCheckedDifficulties(
      checkedDifficulties.filter((value) => value !== field),
    );
  }
}

//Adds or removes a 'Type' from 'checkedMealTypes' depending on whether the checkbox is checked or unchecked.
// If clicked is false, insert the defaultValue (Type) into the 'checkedMealTypes' array in state.
//If Clicked = true, filter the defaultValue (Type) from the 'checkedMealTypes' array and update state.

export function handleMealTypeClick(
  clicked,
  field,
  setCheckedMealTypes,
  checkedMealTypes,
) {
    if(!field || field === null) {
    throw new Error("Field cannot be empty or null");
  }
  if (!clicked)
    setCheckedMealTypes((checkedMealTypes) => [...checkedMealTypes, field]);
  if (clicked) {
    setCheckedMealTypes(checkedMealTypes.filter((value) => value !== field));
  }
}

// Adds or removes a 'sub_type' from 'checkedMealSubTypes' depending on whether the checkbox is checked or unchecked.
//If clicked is false, insert the defaultValue (sub_type) into the 'checkedMealSubTypes' array in state.
//If clicked is true, filter the defaultValue (sub_type) from the 'checkedMealSubTypes' array and update state.

export function handleMealSubTypeClick(
  clicked,
  field,
  setCheckedMealSubTypes,
  checkedMealSubTypes,
) {
    if(!field || field === null) {
    throw new Error("Field cannot be empty or null");
  }
  if (!clicked)
    setCheckedMealSubTypes((checkedMealSubTypes) => [
      ...checkedMealSubTypes,
      field,
    ]);
  if (clicked) {
    setCheckedMealSubTypes(
      checkedMealSubTypes.filter((value) => value !== field),
    );
  }
}
