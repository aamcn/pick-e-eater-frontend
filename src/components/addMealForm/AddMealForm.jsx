import axios from "axios";
import { useState } from "react";

function AddMealForm() {
const [hidden, setIsHidden] = useState(true)
const handleFormSubmit = (event) => {
    event.preventDefault()
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData)
    console.log(formToJson)
    postFormData(formToJson)
    
}

function postFormData(formData) {
    axios
      .post(
        "http://localhost:3000/meals/add-new-meal",
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

  const handleToggle = (event) => {
    event.preventDefault()
    if(hidden == true){
        setIsHidden(false)
    } else {
        setIsHidden(true)
    }
}

  return (
    <div>
      <button onClick={handleToggle}>Update Meals</button>
     {!hidden && 
      <form onSubmit={handleFormSubmit}>
      <fieldset>
        <label htmlFor="name">Meal Name</label>
        <input id="name" name="name" type="text" />
      </fieldset>
      <fieldset>
        <label  htmlFor="type">Type</label>
        <input id="type" name="type" type="text" />
      </fieldset>
      <fieldset>
        <label  htmlFor="subType">Cuisine</label>
        <input id="subType" name="subType" type="text" />
      </fieldset>
      <fieldset>
        <label  htmlFor="difficulty">Difficulty</label>
        <input type="text" id="difficulty" name="difficulty"/>
      </fieldset>
      <button type='submit'>Submit</button>
    </form>}
    </div>
  );
}

export default AddMealForm;
