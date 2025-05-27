import { useEffect, useState } from "react";
import axios from "axios";
import PeopleSelector from "./components/filterByPeople/FilterByPeopleForm";
import MealResultsDisplay from "./components/mealsDisplay/MealResultsDisplay";
import ResultsFilter from "./components/filterResults/ResultsFilter";
import AddMealForm from "./components/addMealForm/AddMealForm";
import AddDislikesForm from "./components/addDislikesForm/AddDislikesForm";
import GetRandonMeals from "./components/getRandomMeals/GetRandomMeals";

function App() {
  const [allDiners, setAllDiners] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [dislikedMeals, setDislikedMeals] = useState([0]);
  const [selectedDinersMeals, setSelectedDinersMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState(selectedDinersMeals);
  const [selectedDiners, setSelectedDiners] = useState([]);

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
        setAllMeals(response.data);
        setFilteredMeals(response.data);
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
    removeDislikedMeals();
  }, [dislikedMeals]);

  return (
    <>
      <div className="titleContainer">
        <h1>Pick 'E' Eater</h1>
      </div>
      <div className="allFormsContainer">
        <GetRandonMeals filteredMeals={filteredMeals} />
        <div>
          <AddMealForm />
        </div>
        <div>
          <AddDislikesForm allMeals={allMeals} allDiners={allDiners} />
        </div>
        <PeopleSelector
          allDiners={allDiners}
          selectedDiners={selectedDiners}
          setSelectedDiners={setSelectedDiners}
          dislikedMeals={dislikedMeals}
          setDislikedMeals={setDislikedMeals}
        />
        <div>
          <ResultsFilter
            setFilteredMeals={setFilteredMeals}
            selectedDinersMeals={selectedDinersMeals}
            allMeals={allMeals}
          />
        </div>
      </div>
      <div className="mealResultsDisplay">
        <MealResultsDisplay
          allMeals={allMeals}
          dislikedMeals={dislikedMeals}
          setDislikedMeals={setDislikedMeals}
          filteredMeals={filteredMeals}
        />
      </div>
    </>
  );
}

export default App;
