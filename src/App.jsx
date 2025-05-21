import { useEffect, useState } from 'react'
import axios from 'axios';
function App() {
  const [people, setPeople] = useState([])
  const [meals, setMeals] = useState([])
  
   function getUsers() {
      axios.get('http://localhost:3000/people',
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        console.log(response);
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
      console.log(response);
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
    <>
      <div>
        <p>hi</p>
      </div>
    </>
  )
}

export default App
