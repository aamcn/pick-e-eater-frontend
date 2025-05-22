import { useEffect, useState } from 'react'
import axios from 'axios';
import PeopleSelector from './components/filterByPeople/FilterByPeopleForm';
import MealResultsDisplay from './components/mealsDisplay/MealResultsDisplay';

function App() {
  const [people, setPeople] = useState([])
  const [meals, setMeals] = useState([])
  const [dislikedMeals, setDislikedMeals] = useState([])



  function getUsers() {
    axios.get('http://localhost:3000/people',
      { method: "cors" },
      { withCredentials: true },
    )
      .then(function (response) {
        setPeople(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function getMeals() {
    axios.get('http://localhost:3000/meals',
      { method: "cors" },
      { withCredentials: true },
    )
      .then(function (response) {
        setMeals(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  useEffect(() => {
    getUsers()
    getMeals()
  }, [])

  return (
    <div>
      <div>
        <p>hi</p>
      </div>
      <PeopleSelector people={people} dislikedMeals={dislikedMeals} setDislikedMeals={setDislikedMeals}/>
      <div>
        <MealResultsDisplay meals={meals} dislikedMeals={dislikedMeals} setDislikedMeals={setDislikedMeals}/>
      </div>
    </div>
  )
}

export default App
