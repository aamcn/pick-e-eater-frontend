

//Adds or removes a difficulty from 'checkedDifficulties' depending on whether the checkbox is checked or unchecked.
  export function handleDifficultyClick(clicked, field, setCheckedDifficulties, checkedDifficulties) {
    // If clicked = false, insert the defaultValue (difficulty) into the checkedDifficultiess array in state.
    if (!clicked)
      setCheckedDifficulties((checkedDifficulties) => [...checkedDifficulties, field]);
    //If clicked = true, filter the defaultValue (difficulty) from the checkedDifficultiess array and update state.
    if (clicked) {
      setCheckedDifficulties(checkedDifficulties.filter((value) => value != field))
    }
  };


    //Adds or removes a 'Type' from 'checkedMealTypes' depending on whether the checkbox is checked or unchecked.
  export function handleMealTypeClick(clicked, field, setCheckedMealTypes, checkedMealTypes) {
    // If clicked is false, insert the defaultValue (Type) into the 'checkedMealTypes' array in state.
    if (!clicked)
      setCheckedMealTypes((checkedMealTypes) => [...checkedMealTypes, field]);
    //If Clicked = true, filter the defaultValue (Type) from the 'checkedMealTypes' array and update state.
    if (clicked) {
        setCheckedMealTypes(checkedMealTypes.filter((value) => value != field));
      }
    };
  
    // Adds or removes a 'sub_type' from 'checkedMealSubTypes' depending on whether the checkbox is checked or unchecked.
    export function handleMealSubTypeClick(clicked, field, setCheckedMealSubTypes, checkedMealSubTypes) {
      //If clicked is false, insert the defaultValue (sub_type) into the 'checkedMealSubTypes' array in state.
      if (!clicked)
        setCheckedMealSubTypes((checkedMealSubTypes) => [...checkedMealSubTypes, field]);
      //If clicked is true, filter the defaultValue (sub_type) from the 'checkedMealSubTypes' array and update state.
      if (clicked) {
        setCheckedMealSubTypes(checkedMealSubTypes.filter((value) => value !== field));
      }
    };