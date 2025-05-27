import { useEffect, useState } from "react";
import axios from "axios";
import PeopleSelector from "./components/filterByPeople/FilterByPeopleForm";
import MealResultsDisplay from "./components/mealsDisplay/MealResultsDisplay";
import ResultsFilter from "./components/filterResults/ResultsFilter";
import AddMealForm from "./components/addMealForm/AddMealForm";
import AddDislikesForm from "./components/addDislikesForm/AddDislikesForm";
import GetRandonMeals from "./components/getRandomMeals/GetRandomMeals";

function App() {
  const [people, setPeople] = useState([]);
  const [meals, setMeals] = useState([]);
  const [dislikedMeals, setDislikedMeals] = useState([0]);
  const [currentPeopleMeals, setCurrentPeopleMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState(currentPeopleMeals);
  const [selectedPeople, setSelectedPeople] = useState([]);

  function getUsers() {
    axios
      .get(
        "http://localhost:3000/people",
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        setPeople(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getMeals() {
    axios
      .get(
        "http://localhost:3000/meals",
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        setMeals(response.data)
        setFilteredMeals(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeDislikedMeals() {
    const filteredArray = meals.filter((meal) => {
      if (!dislikedMeals.includes(meal.id)) {
        return meal;
      }
    });
    setCurrentPeopleMeals(filteredArray);
  }

  useEffect(() => {
    getUsers();
    getMeals();
  }, []);

  useEffect(() => {
    removeDislikedMeals();
  }, [dislikedMeals]);

  return (
    <>
      <div className="titleContainer">
        <h1>Pick 'E' Eater</h1>
      </div>
      <div className="allFormsContainer">
        <GetRandonMeals filteredMeals={filteredMeals}/>
      <div>
        <AddMealForm />
      </div>
      <div>
        <AddDislikesForm meals={meals}  people={people}/>
      </div>
      <PeopleSelector
        people={people}
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
        dislikedMeals={dislikedMeals}
        setDislikedMeals={setDislikedMeals}
      />
      <div>
        <ResultsFilter
          setFilteredMeals={setFilteredMeals} 
          currentPeopleMeals={currentPeopleMeals}
          setCurrentPeopleMeals={setCurrentPeopleMeals}
          meals={meals}
        />
      </div>
      </div>
      <div className="mealResultsDisplay">
        <MealResultsDisplay
          meals={meals}
          dislikedMeals={dislikedMeals}
          setDislikedMeals={setDislikedMeals}
          filteredMeals={filteredMeals}
        />
      </div>
    </>
  );
}

export default App;
