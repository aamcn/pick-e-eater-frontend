import { useEffect, useState } from "react";
import FilterCheckBox from "../filterCheckBox/FilterCheckBox";
import "./mealFilterControls.scss";
import logo from "../../../assets/svg/cookBook.svg";
import { getMealDifficulties, getMealTypes, getMealSubTypes} from "./utilities/getMealPropterties/getMealProperties/";
import { filterSelectedDinersMeals } from "./utilities/filterSelectedDinersMeals/filterSelectedDInersMeals";

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
  const toggleFilterDisplay = () => {
    if (selectedDiners.length <= 0) {
      alert("Please add a diner");
      return;
    } else {
      filterFormClassName == "filterFormBackDrop" ?
        setFilterFormClassName("filterFormBackDrop, hidden") : setFilterFormClassName("filterFormBackDrop");
    }
  };

  /*
    On render or if selectedDinersMeals changes, calls functions to get meal filter 
    options (Difficulty, Type and Sub Type)
  */
  useEffect(() => {
    getMealTypes(allMeals, setMealTypeFields);
    getMealDifficulties(selectedDinersMeals, setDifficultyFields);
    getMealSubTypes(allMeals, setMealSubTypeFields);
  }, []);

  /*
    Calls the filterSelectedDinersMeals function if selectedDinersMeals or any checked filter options change, 
    for example, the easy difficulty check box is clicked.
  */
  useEffect(() => {
      filterSelectedDinersMeals(
        selectedDinersMeals,
        checkedDifficulties,
        checkedMealTypes,
        checkedMealSubTypes,
        setFilteredMeals
      );
  }, [
    checkedDifficulties,
    checkedMealTypes,
    checkedMealSubTypes,
    selectedDinersMeals,
    setFilteredMeals
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
                      clickFunction={handleDiffifcultyClick}
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
                      clickFunction={handleMealTypeClick}
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
                      clickFunction={handleMealSubTypeClick}
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
