import { useEffect, useState } from "react";
import axios from "axios";
import DinerSelector from "./components/filterByDiner/dinerSelector/DinerSelector";
import MealResultsDisplay from "./components/mealsDisplay/MealResultsDisplay";
import MealFilterControls from "./components/mealFilterComponents/mealFilterControls/MealFilterControls";
import AddMealForm from "./components/addMeal/AddMealForm/AddMealForm";
import AddDislikesForm from "./components/updateMealPreferences/updateDislikesForm/UpdateDislikesForm";
import GetRandonMeals from "./components/randomMealSelector/getRandomMeals/GetRandomMeals";
import "./app.scss";
import Header from "./components/headerComponents/header/Header";
import ToolBar from "./components/toolBarComponents/toolBar/ToolBar";
import addMealsIcon from "./assets/svg/addMealsIcon.svg";
import randomMealIcon from "./assets/svg/randomMealIcon.svg";
import preferencesIcon from "./assets/svg/preferencesIcon.svg";
import ToolBarButton from "./components/toolBarComponents/toolBarButtons/ToolBarButton";

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

  //Fetches peopleData from the people database table and stores it in state
  function getUsers() {
    axios
      .get(
        "https://pick-e-eater-backend-production.up.railway.app/diners/",
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        setAllDiners(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Fetches mealsData from the meals database table and stores it in state
  function getMeals() {
    axios
      .get(
        "https://pick-e-eater-backend-production.up.railway.app/meals/",
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        setFilteredMeals(response.data);
        setAllMeals(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  //On render the meals and users fetch functions are called.
  useEffect(() => {
    getUsers();
    getMeals();
  }, []);

  //When 'dislikedMeals' state is updated 'removeDislikedMeals' function is called.
  useEffect(() => {
    if (dislikedMeals.length >= 1) {
      removeDislikedMeals();
    }
  }, [dislikedMeals]);

  function toggleFormDisplay(toggleValue) {
    if (formToDisplay != toggleValue) {
      console.log(toggleValue)
      setFormToDisplay(toggleValue);
    } else {
      setFormToDisplay(false);
    }
    setToolButtonsClassName("toolBarButtons, hidden");
  };

  return (
    <>
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
      <MealResultsDisplay filteredMeals={filteredMeals} />

      <ToolBar
        toolButtonsClassName={toolButtonsClassName}
        setToolButtonsClassName={setToolButtonsClassName}
      />
      <div className={toolButtonsClassName}>
        <ToolBarButton topText={'Random'}  bottomText={'Meals'} randomMealIcon={randomMealIcon} toggleFormDisplay={toggleFormDisplay} toggleValue={'randomMealForm'}/>
        <ToolBarButton topText={'Add'}  bottomText={'Meals'}  randomMealIcon={addMealsIcon} toggleFormDisplay={toggleFormDisplay} toggleValue={'addMealForm'}/>
        <ToolBarButton topText={'Update'}  bottomText={'Likes'}  randomMealIcon={preferencesIcon} toggleFormDisplay={toggleFormDisplay} toggleValue={'updateDislikesForm'}/>
      </div>
      {formToDisplay == "randomMealForm" && (
        <GetRandonMeals
          filteredMeals={filteredMeals}
          toggleFormDisplay={toggleFormDisplay}
        />
      )}
      {formToDisplay == "addMealForm" && (
        <AddMealForm toggleFormDisplay={toggleFormDisplay} getMeals={getMeals}/>
      )}
      {formToDisplay == "updateDislikesForm" && (
        <AddDislikesForm
          toggleFormDisplay={toggleFormDisplay}
          allMeals={allMeals}
          allDiners={allDiners}
          getUsers={getUsers}
        />
      )}
    </>
  );
}

export default App;
