import { useEffect, useState } from "react";
import FilterCheckBox from "../filterCheckBox/FilterCheckBox";
import "./mealFilterControls.scss";
function MealFilterControls({
  allMeals,
  selectedDinersMeals,
  setFilteredMeals,
  selectedDiners
}) {
  const [difficultyFields, setDifficultyFields] = useState([]);
  const [checkedDifficulties, setCheckedDifficulties] = useState([]);
  const [mealTypeFields, setMealTypeFields] = useState([]);
  const [checkedMealTypes, setCheckedMealTypes] = useState([]);
  const [mealSubTypeFields, setMealSubTypeFields] = useState([]);
  const [checkedMealSubTypes, setCheckedMealSubTypes] = useState([]);

  const [hiddenDiff, setIsHiddenDiff] = useState('filterFormBackDrop, hidden');
  const [hiddenType, setIsHiddenType] = useState(true);
  const [hiddenSub, setIsHiddenSub] = useState(true);

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

  /* 
    Adds or removes a difficulty from 'checkedDifficulties' depending on whether the checkbox is checked or unchecked.
    If checkbox is checked, insert the defaultValue (difficulty) into the checkedDifficultiess array in state.
    If checkbox is unchecked, filter the defaultValue (difficulty) from the checkedDifficultiess array and update state.
  */
  const handleDiffifcultyClick = (event) => {
    if (!event.target.checked)
      setCheckedDifficulties((checkedDifficulties) => [
        ...checkedDifficulties,
        event.target.value,
      ]);
    if (event.target.checked) {
      const filteredDifficultes = checkedDifficulties.filter(
        (value) => value != event.target.value,
      );
      setCheckedDifficulties(filteredDifficultes);
    }
  };

  /* 
    Adds or removes a 'Type' from 'checkedMealTypes' depending on whether the checkbox is checked or unchecked.
    If checkbox is checked, insert the defaultValue (Type) into the 'checkedMealTypes' array in state.
    If checkbox is unchecked, filter the defaultValue (Type) from the 'checkedMealTypes' array and update state.
  */
  const handleMealTypeClick = (event) => {
    if (!event.target.checked)
      setCheckedMealTypes((checkedMealTypes) => [
        ...checkedMealTypes,
        event.target.value,
      ]);
    if (event.target.checked) {
      console.log(event.target.value);
      const t = checkedMealTypes.filter((value) => value != event.target.value);
      setCheckedMealTypes(t);
    }
  };

  /* 
    Adds or removes a 'sub_type' from 'checkedMealSubTypes' depending on whether the checkbox is checked or unchecked.
    If checkbox is checked, insert the defaultValue (sub_type) into the 'checkedMealSubTypes' array in state.
    If checkbox is unchecked, filter the defaultValue (sub_type) from the 'checkedMealSubTypes' array and update state.
  */
  const handleMealSubTypeClick = (event) => {
    if (!event.target.checked)
      setCheckedMealSubTypes((checkedMealSubTypes) => [
        ...checkedMealSubTypes,
        event.target.value,
      ]);
    if (event.target.checked) {
      console.log(event.target.value);
      const r = checkedMealSubTypes.filter(
        (value) => value !== event.target.value,
      );
      setCheckedMealSubTypes(r);
    }
  };

  //When button is clicked it toggles the display of the form depending on its current state.
  const toggleFilterDisplay = (event) => {
    
    console.log(selectedDiners)
    if(selectedDiners.length <= 0){
      alert('Please add a diner')
      return
    }else if (hiddenDiff == 'filterFormBackDrop') {
      setIsHiddenDiff('filterFormBackDrop, hidden');
    } else {
      setIsHiddenDiff('filterFormBackDrop');
    }
  };

  /*
  
  */

  function removeDiffMeals() {
    const filteredArray = selectedDinersMeals.filter((meal) => {
      if (!checkedDifficulties.includes(meal.difficulty)) {
        return meal;
      }
    });
    const typeFilter = filteredArray.filter((meal) => {
      if (!checkedMealTypes.includes(meal.type)) {
        return meal;
      }
    });
    let mealResults = [];
    const subTypeFilter = typeFilter.filter((meal) => {
      if (!checkedMealSubTypes.includes(meal.sub_type)) {
        mealResults.push(meal);
      }
    });
    setFilteredMeals(mealResults);
  }

  useEffect(() => {
    getMealTypes();
    getMealDifficulties();
    getMealSubTypes();
  }, [selectedDinersMeals]);

  useEffect(() => {
    console.log(checkedMealTypes);
    console.log(checkedMealSubTypes);
    console.log(checkedDifficulties);
    removeDiffMeals();
  }, [
    checkedDifficulties,
    checkedMealTypes,
    checkedMealSubTypes,
    selectedDinersMeals,
  ]);

  return (

    <div className='mealFilterControls'>
      <div className='filterToggleContainer'>
        <button onClick={toggleFilterDisplay} className='toggleButton'>Filter</button>
      </div>

      <div className={hiddenDiff}>
        <div className='filterForm'>
            <div className='filterOptionsContainer'>
            <div className='filterTitleContainer'>
          <h4 className='filterTitle'>Difficulty</h4>
        </div>
        <div className="filterOption">
          {difficultyFields &&
            difficultyFields.map((difficultyField) => {
              return (
                <FilterCheckBox
                  field={difficultyField}
                  onChange={handleDiffifcultyClick}
                />
              );
            })}
        </div>
        <div className='filterTitleContainer'>
          <h4 className='filterTitle'>Type</h4>
        </div>
        <div className="filterOption">
          {mealTypeFields &&
            mealTypeFields.map((typeField) => {
              return (
                <FilterCheckBox
                  field={typeField}
                  onChange={handleMealTypeClick}
                />
              );
            })}
        </div>
        <div className='filterTitleContainer'>
          <h4 className='filterTitle'>Cuisine</h4>
        </div>
        <div className="filterOption">
          {mealSubTypeFields &&
            mealSubTypeFields.map((subTypeField) => {
              return (
                <FilterCheckBox
                  field={subTypeField}
                  onChange={handleMealSubTypeClick}
                />
              );
            })}
        </div>
        </div>
        
        <div className='filterToggleContainer'>
          <button onClick={toggleFilterDisplay} className='toggleButton'>Done</button>
        </div>
        </div>
        
      </div>
    </div>

  );
}

export default MealFilterControls;
