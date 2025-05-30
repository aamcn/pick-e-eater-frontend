import axios from "axios";
import { useState } from "react";
import "./updateDislikesForm.scss";
/* 
  Renders a form allowing the user to select a diner and a meal, on form submission the diner ID and the meal ID
  is posted to the server storing the meal in the diners disliked meals column.
*/
function AddDislikesForm({ allDiners, allMeals, toggleAddMealForm, toggleFormDisplay }) {
  const [hidden, setIsHidden] = useState(true);

  /* 
    prepares form data before posting to server by creating formData object from the event.target and coverts 
    it to JSON before passing it to the 'postFormData' function.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData);
    postFormData(formToJson);
  };

  //Function to post form to the server.
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

  //When button is clicked it toggles the display of the form depending on its current state.
  const handleToggle = (event) => {
    event.preventDefault();
    if (hidden == true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="updateDislikesBackDrop">
      <form  className="updateDislikesForm" onSubmit={handleFormSubmit}>
        <fieldset className='dislikesFieldSet'>
          <label htmlFor="personId">Person:</label>
          <select id="personId" name="personId" onChange={handleSelectChange}>
            <option>Pick a Name</option>
            {allDiners &&
              allDiners.map((person) => {
                return <option value={person.id}>{person.name}</option>;
              })}
          </select>
        </fieldset>
        <fieldset className='dislikesFieldSet'>
          <label htmlFor="mealId">Meal:</label>
          <select id="mealId" name="mealId" onChange={handleSelectChange}>
            <option>Pick a Meal</option>
            {allMeals &&
              allMeals.map((meal) => {
                return <option value={meal.id}>{meal.name}</option>;
              })}
          </select>
        </fieldset>
        <div>
          <button className='dislikesFormButton' type="submit">Submit</button>
          <button value='updateDislikesForm' onClick={toggleFormDisplay} className='dislikesFormButton' type="button">Cancel</button>

        </div>

      </form>
    </div>
  );
}

export default AddDislikesForm;
