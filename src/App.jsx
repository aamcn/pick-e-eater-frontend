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
function App() {
  const [allDiners, setAllDiners] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [dislikedMeals, setDislikedMeals] = useState([]);
  const [selectedDinersMeals, setSelectedDinersMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedDiners, setSelectedDiners] = useState([]);
  const [toolButtonsClassName, setToolButtonsClassName] = useState('toolBarButtons, hidden')
  const [randomMealsHidden, setRandomMealsHidden] = useState(true)



  //Fetches peopleData from the people database table and stores it in state
  function getUsers() {
    axios
      .get(
        "http://localhost:3000/people",
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
        "http://localhost:3000/meals",
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

const toggleRandomMealSelector = (event) => {
    event.preventDefault();
    if (randomMealsHidden == true) {
      setRandomMealsHidden(false);
    } else {
      setRandomMealsHidden(true);
    }
  }


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
          setFilteredMeals={setFilteredMeals}
          selectedDinersMeals={selectedDinersMeals}
          allMeals={allMeals}
        />
      <MealResultsDisplay filteredMeals={filteredMeals} />
      <ToolBar toolButtonsClassName={toolButtonsClassName} setToolButtonsClassName={setToolButtonsClassName}/>
      <div className={toolButtonsClassName}>
        <button onClick={toggleRandomMealSelector} className="toolBarButton" >Random Meal Generator</button>
        <button className="toolBarButton" >Add New Meals</button>
        <button className="toolBarButton" >Update Diner Preferences</button>
      </div>
      {!randomMealsHidden && <GetRandonMeals filteredMeals={filteredMeals} toggleRandomMealSelector={toggleRandomMealSelector}/>} 
       {/* <AddMealForm /> */}
       {/* <AddDislikesForm allMeals={allMeals} allDiners={allDiners} /> */}
    </>
  );
}

export default App;
