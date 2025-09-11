import axios from "axios";
import "./addMealForm.scss";
import { checkIfDuplicate } from "./utillities/checkIfDuplicate/checkIfDuplicate";
import { postNewMeal } from "./utillities/postNewMeal/postNewMeal";
import { useEffect, useState } from "react";

function AddMealForm({ toggleFormDisplay, getMeals, allMeals }) {
  const [inputMealName, setInputMealName] = useState(null);
  const [isMealDuplicate, setIsMealDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Updates inputMealName state on every change to the meal name input field.
  const handleMealNameChange = (event) => {
    setInputMealName(event.target.value);
  };

  // Handles form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // If meal is a duplicate, alert user and do not submit form.
    if (isMealDuplicate == true) {
      alert("Meal is already saved");
      return;
    }
    //Create formData object and convert to JSON and calls post function.
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData);
    postNewMeal(formToJson);
    //Calls getMeals function to collect updated 'meals' data from database.
    getMeals();
    setSuccessMessage("Meal Added");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  useEffect(() => {
    // Create array of all meal names in lowercase to check for duplicates.
    const allMealNames = allMeals.map((meal) => {
      return meal.name.toLowerCase();
    });
    if (inputMealName) {
      checkIfDuplicate(
        allMealNames,
        setErrorMessage,
        setIsMealDuplicate,
        inputMealName,
      );
    }
  }, [inputMealName, allMeals]);

  return (
    <div className="addMealBackdrop">
      <form
        className="addMealForm"
        onSubmit={handleFormSubmit}
        data-testid="add-meal-form"
      >
        <h3 className="addMealTitle">Add a New Meal</h3>

        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <fieldset className="addMealFieldset">
          <label htmlFor="name">Meal Name: </label>
          <input
            onChange={handleMealNameChange}
            className="addMealInput"
            id="name"
            name="name"
            type="text"
            required
          />
        </fieldset>
        <fieldset className="addMealFieldset">
          <label htmlFor="type">Type: </label>
          <input
            className="addMealInput"
            id="type"
            name="type"
            type="text"
            required
          />
        </fieldset>
        <fieldset className="addMealFieldset">
          <label htmlFor="subType">Main Ingredient: </label>
          <input
            className="addMealInput"
            id="subType"
            name="subType"
            type="text"
            required
          />
        </fieldset>
        <fieldset className="addMealFieldset">
          <label htmlFor="difficulty">Difficulty: </label>
          <input
            className="addMealInput"
            type="text"
            id="difficulty"
            name="difficulty"
            required
          />
        </fieldset>
        <div className="addMealButtons">
          <button
            value="addMealForm"
            onClick={toggleFormDisplay}
            className="addMealButton"
            type="submit"
          >
            Close
          </button>
          <button className="addMealButton" type="submit">
            Submit
          </button>
          <button className="addMealButton" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMealForm;
