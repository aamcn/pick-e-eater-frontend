import { useEffect, useState } from "react";
import FilterCheckBox from "../filterCheckBox/FilterCheckBox";
import "./mealFilterControls.scss";
import logo from "../../../assets/svg/cookBook.svg";
import { getMealDifficulties, getMealTypes, getMealSubTypes} from "./utilities/getMealProperties/getMealProperties";
import { filterSelectedDinersMeals } from "./utilities/filterSelectedDinersMeals/filterSelectedDInersMeals";
import { handleDifficultyClick, handleMealTypeClick, handleMealSubTypeClick} from "./utilities/filterClickFunctions/filterClickFunctions";
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
    getMealDifficulties(allMeals, setDifficultyFields);
    getMealSubTypes(allMeals, setMealSubTypeFields);
  }, [selectedDiners]);

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
  }, [selectedDinersMeals, checkedDifficulties, checkedMealTypes, checkedMealSubTypes]);

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
                      clickFunction={handleDifficultyClick}
                      setCheckedFields={setCheckedDifficulties}
                      checkedFields={checkedDifficulties}
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
                      setCheckedFields={setCheckedMealTypes}
                      checkedFields={checkedMealTypes}
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
                      setCheckedFields={setCheckedMealSubTypes}
                      checkedFields={checkedMealSubTypes}
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
