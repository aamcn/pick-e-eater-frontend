import { useEffect, useState } from "react";
import FilterCheckBox from "../filterCheckBox/FilterCheckBox";
import "./mealFilterControls.scss";
import logo from "../../../assets/svg/cookBook.svg";
function MealFilterControls({
  allMeals,
  selectedDinersMeals,
  setFilteredMeals,
  selectedDiners,
}) {
  const [difficultyFields, setDifficultyFields] = useState([]);
  const [checkedDifficulties, setCheckedDifficulties] = useState([]);
  const [mealTypeFields, setMealTypeFields] = useState([]);
  const [checkedMealTypes, setCheckedMealTypes] = useState([]);
  const [mealSubTypeFields, setMealSubTypeFields] = useState([]);
  const [checkedMealSubTypes, setCheckedMealSubTypes] = useState([]);
  const [filterFormClassName, setFilterFormClassName] = useState("filterFormBackDrop, hidden");

  /*
    Extract each meals difficulty from the 'allMeals' array.
    Removes duplicates from the array and stores the array of unique strings in the 'difficultyFields' array in state.
  */
  function getMealDifficulties() {
    const difficultyArr = selectedDinersMeals.map((meal) => {
      return meal.difficulty;
    });
    setDifficultyFields([...new Set(difficultyArr)]);
  }

  /* 
    Extract each meals 'Type' from the 'allMeals' array. 
    Removes duplicate types from the array and stores the array of unique types in the 'mealTypeFields' array in state.
  */
  function getMealTypes() {
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
  function getMealSubTypes() {
    const subTypeArr = allMeals.map((meal) => {
      return meal.sub_type;
    });
    setMealSubTypeFields([...new Set(subTypeArr)]);
  }


  //Adds or removes a difficulty from 'checkedDifficulties' depending on whether the checkbox is checked or unchecked.
  const handleDiffifcultyClick = (clicked, field) => {
    // If clicked = false, insert the defaultValue (difficulty) into the checkedDifficultiess array in state.
    if (!clicked)
      setCheckedDifficulties((checkedDifficulties) => [...checkedDifficulties, field]);
    //If clicked = true, filter the defaultValue (difficulty) from the checkedDifficultiess array and update state.
    if (clicked) {
      setCheckedDifficulties(checkedDifficulties.filter((value) => value != field))
    }
  };

  //Adds or removes a 'Type' from 'checkedMealTypes' depending on whether the checkbox is checked or unchecked.
  const handleMealTypeClick = (clicked, field) => {
    // If clicked is false, insert the defaultValue (Type) into the 'checkedMealTypes' array in state.
    if (!clicked)
      setCheckedMealTypes((checkedMealTypes) => [...checkedMealTypes, field]);
    //If Clicked = true, filter the defaultValue (Type) from the 'checkedMealTypes' array and update state.
    if (clicked) {
      setCheckedMealTypes(checkedMealTypes.filter((value) => value != field));
    }
  };


  // Adds or removes a 'sub_type' from 'checkedMealSubTypes' depending on whether the checkbox is checked or unchecked.
  const handleMealSubTypeClick = (clicked, field) => {
    //If clicked is false, insert the defaultValue (sub_type) into the 'checkedMealSubTypes' array in state.
    if (!clicked)
      setCheckedMealSubTypes((checkedMealSubTypes) => [...checkedMealSubTypes, field]);
    //If clicked is true, filter the defaultValue (sub_type) from the 'checkedMealSubTypes' array and update state.
    if (clicked) {
      setCheckedMealSubTypes(checkedMealSubTypes.filter((value) => value !== field));
    }
  };

  //When button is clicked it toggles the display of the form depending on its current state.
  const toggleFilterDisplay = (event) => {
    if (selectedDiners.length <= 0) {
      alert("Please add a diner");
      return;
    } else {
      filterFormClassName == "filterFormBackDrop" ?
        setFilterFormClassName("filterFormBackDrop, hidden") : setFilterFormClassName("filterFormBackDrop");
    }
  };

  /*
    Reusable filter function for 'filterSelectedDinerMeals'.
    If the 'optionArray' argument does not include the mealValue argument the mealValue argument is returned.
  */
  function filterFunction(optionArray, mealValue) {
    if (!optionArray.includes(mealValue))
      return mealValue
  }

  /*
    Function filters 'selectedDinerMeals' by passing each meal through 'filterFunction'.
    Each filter passes an 'optionArray' and 'mealValue' through 'filterFunction'. If the 'optionArray' does
    not include the 'mealValue' for all three filters, the 'meal' is added to 'filteredArray'.
  */
  function filterSelectedDinersMeals() {
    const filteredArray = selectedDinersMeals.filter(meal => {
      return filterFunction(checkedDifficulties, meal.difficulty)
    })
      .filter((meal => {
        return filterFunction(checkedMealTypes, meal.type)
      }))
      .filter((meal => {
        return filterFunction(checkedMealSubTypes, meal.sub_type)
      }));
    setFilteredMeals(filteredArray);
  }

  /*
    On render or if selectedDinersMeals changes, calls functions to get meal filter 
    options (Difficulty, Type and Sub Type)
  */
  useEffect(() => {
    getMealTypes();
    getMealDifficulties();
    getMealSubTypes();
  }, [selectedDinersMeals]);

  /*
    Calls the filterSelectedDinersMeals function if selectedDinersMeals or any checked filter options change, 
    for example, the easy difficulty check box is clicked.
  */
  useEffect(() => {
    filterSelectedDinersMeals();
  }, [
    checkedDifficulties,
    checkedMealTypes,
    checkedMealSubTypes,
    selectedDinersMeals,
  ]);

  return (
    <div className="mealFilterControls">
      <div className="filterToggleContainer">
        <button onClick={toggleFilterDisplay} className="toggleButton">
          <img width="40vw" src={logo}></img>Filter
        </button>
      </div>

      <div className={filterFormClassName}>
        <div className="filterForm">
          <div className="filterOptionsContainer">
            <div className="filterTitleContainer">
              <h4 className="filterTitle">Difficulty</h4>
            </div>
            <div className="filterOption">
              {difficultyFields &&
                difficultyFields.map((difficultyField) => {
                  return (
                    <FilterCheckBox
                      field={difficultyField}
                      onClick={handleDiffifcultyClick}
                    />
                  );
                })}
            </div>
            <div className="filterTitleContainer">
              <h4 className="filterTitle">Type</h4>
            </div>
            <div className="filterOption">
              {mealTypeFields &&
                mealTypeFields.map((typeField) => {
                  return (
                    <FilterCheckBox
                      field={typeField}
                      onClick={handleMealTypeClick}
                    />
                  );
                })}
            </div>
            <div className="filterTitleContainer">
              <h4 className="filterTitle">Main Ingredient</h4>
            </div>
            <div className="filterOption">
              {mealSubTypeFields &&
                mealSubTypeFields.map((subTypeField) => {
                  return (
                    <FilterCheckBox
                      field={subTypeField}
                      onClick={handleMealSubTypeClick}
                    />
                  );
                })}
            </div>
          </div>

          <div className="filterToggleContainer">
            <button onClick={toggleFilterDisplay} className="toggleButton">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealFilterControls;
