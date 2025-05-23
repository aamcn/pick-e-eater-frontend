import { useEffect, useState } from "react";
import FilterCheckBox from "./FilterCheckBox";

function ResultsFilter({
  meals,
  currentPeopleMeals,
  filteredMeals,
  setFilteredMeals,
}) {
  const [difficultyFields, setDifficultyFields] = useState([]);
  const [checkedDifficulties, setCheckedDifficulties] = useState([]);
  const [mealTypeFields, setMealTypeFields] = useState([]);
  const [checkedMealTypes, setCheckedMealTypes] = useState([]);
  const [mealSubTypeFields, setMealSubTypeFields] = useState([]);
  const [checkedMealSubTypes, setCheckedMealSubTypes] = useState([]);

  const [hiddenDiff, setIsHiddenDiff] = useState(true)
  const [hiddenType, setIsHiddenType] = useState(true)
  const [hiddenSub, setIsHiddenSub] = useState(true)

  function getMealDifficulties() {
    const difficultyArr = meals.map((meal) => {
      return meal.difficulty;
    });
    setDifficultyFields([...new Set(difficultyArr)]);
  }

  function getMealTypes() {
    const mealTypeArr = meals.map((meal) => {
      return meal.type;
    });
    setMealTypeFields([...new Set(mealTypeArr)]);
  }

  function getMealSubTypes() {
    const subTypeArr = meals.map((meal) => {
      return meal.sub_type;
    });
    setMealSubTypeFields([...new Set(subTypeArr)]);
  }

  const handleDiffifcultyClick = (event) => {
    if (!event.target.checked)
      setCheckedDifficulties((checkedDifficulties) => [
        ...checkedDifficulties,
        event.target.value,
      ]);
    if (event.target.checked) {
      const t = checkedDifficulties.filter(
        (value) => value != event.target.value,
      );
      setCheckedDifficulties(t);
    }
  };

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


  const handleToggleDiff = (event) => {
    event.preventDefault()
    if(hiddenDiff == true){
        setIsHiddenDiff(false)
    } else {
        setIsHiddenDiff(true)
    }
}

const handleToggleType = (event) => {
  event.preventDefault()
  if(hiddenType == true){
      setIsHiddenType(false)
  } else {
      setIsHiddenType(true)
  }
}

const handleToggleSub = (event) => {
  event.preventDefault()
  if(hiddenSub == true){
      setIsHiddenSub(false)
  } else {
      setIsHiddenSub(true)
  }
}




  function removeDiffMeals() {
    const filteredArray = currentPeopleMeals.filter((meal) => {
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
  }, [currentPeopleMeals]);

  useEffect(() => {
    console.log(checkedMealTypes);
    console.log(checkedMealSubTypes);
    removeDiffMeals();
  }, [
    checkedDifficulties,
    checkedMealTypes,
    checkedMealSubTypes,
    currentPeopleMeals,
  ]);

  return (
    <div>
      <h3>Filter</h3>
      <div>
        <h4>Difficulty</h4>
        <button onClick={handleToggleDiff}>Choose Difficulty</button>
    {!hiddenDiff && difficultyFields &&
          difficultyFields.map((difficultyField) => {
            return (
              <FilterCheckBox
                field={difficultyField}
                onChange={handleDiffifcultyClick}
              />
            );
          })}
      </div>
      <div>
        <h4>Type</h4>
        <button onClick={handleToggleDiff}>Choose Types</button>
    {!hiddenDiff && mealTypeFields &&
          mealTypeFields.map((typeField) => {
            return (
              <FilterCheckBox
                field={typeField}
                onChange={handleMealTypeClick}
              />
            );
          })}
      </div>
      <div>
        <h4>Cuisine</h4>
        <button onClick={handleToggleDiff}>Choose Types</button>
    {!hiddenSub && mealSubTypeFields &&
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
  );
}

export default ResultsFilter;
