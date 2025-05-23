import axios from "axios";
import { useState } from "react";

function AddDislikesForm({ people, meals }){
const [hidden, setIsHidden] = useState(true)


const handleSelectChange = (event) => {
    console.log(event.target.value)
}

const handleFormSubmit = (event) => {
    event.preventDefault()
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData)
    console.log(formToJson)
    postFormData(formToJson)
    
}

const handleToggle = (event) => {
    event.preventDefault()
    if(hidden == true){
        setIsHidden(false)
    } else {
        setIsHidden(true)
    }
}

function postFormData(formData) {
    axios
      .post(
        "http://localhost:3000/people/add-meal-to-dislikes",
        { formData },
        { method: "cors" },
        { withCredentials: true },
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    return(
        <div>
            <button onClick={handleToggle}>Update dislikes</button>
            {!hidden && 
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <label htmlFor="personId" >Person:</label>|
                    <select id="personId" name="personId" onChange={handleSelectChange}>
                        <option>Pick a Name</option>
                        {people && people.map(person => {
                           return <option value={person.id}>{person.name}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                <label htmlFor="mealId" >Meal:</label>|
                <select id="mealId" name="mealId" onChange={handleSelectChange}>
                        <option>Pick a Meal</option>
                        {meals && meals.map(meal => {
                           return <option value={meal.id}>{meal.name}</option>
                        })}
                    </select>
                </fieldset>
                <button type='submit'>Submit</button>
            </form>}
        </div>
    )
}

export default AddDislikesForm;



