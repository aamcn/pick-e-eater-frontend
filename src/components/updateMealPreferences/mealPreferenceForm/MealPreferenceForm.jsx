import axios from "axios";
import { useEffect, useState } from "react";
import "./mealPreferenceForm.scss";
import MealCheckBoxTemplate from "../mealCheckBoxTemplate/MealCheckBoxTemplate";
import React from "react";
/* 
  Renders a form allowing the user to select a diner and a meal, on form submission the diner ID and the meal ID
  is posted to the server storing the meal in the diners disliked meals column.
*/
function UpdateDislikesForm({
  allDiners,
  allMeals,
  toggleFormDisplay,
}) {
  const [selectedDiner, setSelectedDiner] = useState(null);
  const [dinerDislikedMeals, setDinerDislikedMeals] = useState([]);

  /* 
    prepares form data before posting to server by creating formData object from the event.target and coverts 
    it to JSON before passing it to the 'postFormData' function.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    dinerDislikedMeals.forEach((value) => {
      bodyFormData.append("mealIdArray[]", value); // you have to add array symbol after the key name
    });
    bodyFormData.append("dinerId", selectedDiner.id);
    const formToJson = axios.formToJSON(bodyFormData);
    postFormData(formToJson);
  };

  //Function to post form to the server.
  function postFormData(formData) {
    axios
      .post(
        "https://pick-e-eater-backend-production.up.railway.app/diners/add-meals-to-dislikes",
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

  //When a diners name is selected in the form the inputs value is used to store the diner in state.
  function handleSelectChange (event){
    let index = event.target.value;
    const selectedDiner = allDiners.filter((diner) => {
      if (diner.id == index) return diner;
    });
    setSelectedDiner(selectedDiner[0]);
  };

  /*
On render chosenDislikedMeals is reset. When there is a 'selectedDiner' stored in state their
dislikes array is stored in chosenDislikedMeals. This is used to pre fillout the checkbox options
with the diners disliked meals stored in database.
*/
  useEffect(() => {
    setDinerDislikedMeals([]);
    if (selectedDiner) {
      setDinerDislikedMeals(selectedDiner.dislikes);
    }
  }, [selectedDiner]);

  return (
    <div className="updateDislikesBackDrop" data-testid="meal-preference-form-container">
      <form className="updateDislikesForm" onSubmit={handleFormSubmit}>
        <div>
          <h2 className="mealPreferenceFormTitle">Update Meal Preferences</h2>
        </div>
        <fieldset className="dinerSelectContainer">
          <label htmlFor="personId">Person:</label>
          <select
            className="dinerSelectorInput"
            id="personId"
            name="personId"
            defaultChecked={"Pick a Name"}
            onChange={handleSelectChange}
            data-testid="diner-select"

          >
            <option data-testid="diner-option">Pick a Name</option>
            {allDiners &&
              allDiners.map((person) => {
                return <option value={person.id} data-testid="diner-option">{person.name}</option>;
              })}
          </select>
        </fieldset>
        <fieldset className="mealsCheckBoxContainer" data-testid="meals-checkbox-container">
          {selectedDiner &&
            allMeals.map((meal) => {
              return (
                <MealCheckBoxTemplate
                  meal={meal}
                  selectedDiner={selectedDiner}
                  dinerDislikedMeals={dinerDislikedMeals}
                  setDinerDislikedMeals={setDinerDislikedMeals}
                  
                />
              );
            })}
        </fieldset>
        <div className="preferenceFormButtons">
          <button
            value="updatepreferenceForm"
            onClick={toggleFormDisplay}
            className="preferenceFormButton"
            type="button"
          >
            Close
          </button>
          <button className="preferenceFormButton" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDislikesForm;
