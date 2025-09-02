import { useEffect, useState } from "react";
import DinerSelector from "./components/filterByDiner/dinerSelector/DinerSelector";
import MealResultsDisplay from "./components/mealsDisplay/MealResultsDisplay";
import MealFilterControls from "./components/mealFilterComponents/mealFilterControls/MealFilterControls";
import AddMealForm from "./components/addMeal/AddMealForm/AddMealForm";
import MealPreferenceForm from "./components/updateMealPreferences/mealPreferenceForm/MealPreferenceForm";
import GetRandomMeals from "./components/randomMealSelector/getRandomMeals/GetRandomMeals";
import "./app.scss";
import Header from "./components/headerComponents/header/Header";
import ToolBar from "./components/toolBarComponents/toolBar/ToolBar";
import addMealsIcon from "./assets/svg/addMealsIcon.svg";
import randomMealIcon from "./assets/svg/randomMealIcon.svg";
import preferencesIcon from "./assets/svg/preferencesIcon.svg";
import ToolBarButton from "./components/toolBarComponents/toolBarButtons/ToolBarButton";
import { getMeals } from "../services/backendCalls/getMeals";
import { getDiners } from "../services/backendCalls/getDiners";
import { createContext } from "react"; 

export const appContext = createContext({
  allDiners: [],
  storeAllDiners: () => {},
  allMeals: [],
  storeAllMeals: () => {},
  filteredMeals: [],
  storeFilteredMeals: () => {},
});

function App() {
  const [allDiners, setAllDiners] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [dislikedMeals, setDislikedMeals] = useState([]);
  const [selectedDinersMeals, setSelectedDinersMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedDiners, setSelectedDiners] = useState([]);
  const [toolButtonsClassName, setToolButtonsClassName] = useState(
    "toolBarButtons, hidden",
  );
  const [formToDisplay, setFormToDisplay] = useState(false);

  const storeAllDiners = (diners) => {
    setAllDiners(diners);
  };

  const storeAllMeals = (meals) => {
    setAllMeals(meals);
  };

  const storeFilteredMeals = (meals) => {
    setFilteredMeals(meals);
  };

  /*
    Filters the full meal list by returning meals that are NOT found in the 'dislikedMeals' array in state.
    The filtered array is then stored in 'currentPeopleMeals' state.
  */
  function removeDislikedMeals() {
    const filteredArray = allMeals.filter((meal) => {
      if (!dislikedMeals.includes(meal.id)) {
        return meal;
      }
    });
    setSelectedDinersMeals(filteredArray);
  }

  //On render the meals and diners fetch functions are called.
  useEffect(() => {
     getDiners(setAllDiners)
    getMeals(setFilteredMeals, setAllMeals)
  }, []);

  //When 'dislikedMeals' state is updated 'removeDislikedMeals' function is called.
  useEffect(() => {
    if (dislikedMeals.length >= 1) {
      removeDislikedMeals();
    }
  }, [dislikedMeals]);

  /* Each buttons value is a corresponds to a form. When a tool button is clicked its value is stored in state.
    The form matching the string stored in state is then displayed. If the form is already displayed the value in state is set as false
    hiding all forms. At the end of the function whether a form is displayed or hidden the toolbar menu is then hidden.
*/
  function toggleFormDisplay(toggleValue) {
    if (formToDisplay !== toggleValue) {
      setFormToDisplay(toggleValue);
    } else {
      setFormToDisplay(false);
    }
    setToolButtonsClassName("toolBarButtons, hidden");
  }

  return (
    <>
      <appContext.Provider value={{
        allDiners,
        storeAllDiners,
        allMeals,
        storeAllMeals,
        filteredMeals,
        storeFilteredMeals
      }}>
        <Header />

      <DinerSelector
        allDiners={allDiners}
        selectedDiners={selectedDiners}
        setSelectedDiners={setSelectedDiners}
        dislikedMeals={dislikedMeals}
        setDislikedMeals={setDislikedMeals}
      />

      <MealFilterControls
        selectedDiners={selectedDiners}
        setFilteredMeals={setFilteredMeals}
        selectedDinersMeals={selectedDinersMeals}
        allMeals={allMeals}
      />
      
      <MealResultsDisplay />

      <ToolBar
        toolButtonsClassName={toolButtonsClassName}
        setToolButtonsClassName={setToolButtonsClassName}
      />

      <div className={toolButtonsClassName}>
        <ToolBarButton
          topText={"Random"}
          bottomText={"Meals"}
          toolButtonIcon={randomMealIcon}
          toggleFormDisplay={toggleFormDisplay}
          toggleValue={"randomMealForm"}
        />
        <ToolBarButton
          topText={"Add"}
          bottomText={"Meals"}
          toolButtonIcon={addMealsIcon}
          toggleFormDisplay={toggleFormDisplay}
          toggleValue={"addMealForm"}
        />
        <ToolBarButton
          topText={"Update"}
          bottomText={"Likes"}
          toolButtonIcon={preferencesIcon}
          toggleFormDisplay={toggleFormDisplay}
          toggleValue={"mealPreferenceForm"}
        />
      </div>

      {formToDisplay == "randomMealForm" && (
        <GetRandomMeals
          filteredMeals={filteredMeals}
          toggleFormDisplay={toggleFormDisplay}
        />
      )}
      {formToDisplay == "addMealForm" && (
        <AddMealForm
          allMeals={allMeals}
          toggleFormDisplay={toggleFormDisplay}
          getMeals={getMeals}
        />
      )}
      {formToDisplay == "mealPreferenceForm" && (
        <MealPreferenceForm
          toggleFormDisplay={toggleFormDisplay}
          allMeals={allMeals}
          allDiners={allDiners}
          getUsers={getDiners}
        />
      )}
      </appContext.Provider>
    </>
  );
}

export default App;
