import axios from "axios";
import "./addMealForm.scss";
import { checkIfDuplicate } from "./utillities/checkIfDuplicate/checkIfDuplicate";
import { postNewMeal } from "./utillities/postNewMeal/postNewMeal";
import { useState, useMemo } from "react";

function AddMealForm({ toggleFormDisplay, getMeals, allMeals }) {
  const [inputMealName, setInputMealName] = useState(null);
  const [isMealDuplicate, setIsMealDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [allMealNames, setAllMealNames] = useState([]);

  // Updates inputMealName state on every change to the meal name input field.
  const handleMealNameChange = (event) => {
    setInputMealName(event.target.value);
  };

  function getAllMealNames() {
    const allMealNames = allMeals.map((meal) => {
      return meal.name.toLowerCase();
    });
    setAllMealNames(allMealNames);
  }

  // useMemo hook to update allMealNames array whenever allMeals changes.
  useMemo(() => {
    getAllMealNames();
  }, [allMeals]);

  // useMemo hook to check for duplicate meal names whenever inputMealName changes.
  useMemo(() => {
    checkIfDuplicate(
      allMealNames,
      setErrorMessage,
      setIsMealDuplicate,
      inputMealName,
    );
  }, [inputMealName]);

  // Handles form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // If meal is a duplicate, alert user and do not submit form.
    if (isMealDuplicate === true) {
      alert("This meal is already on the list!");
      return;
    }
    //Create formData object and convert to JSON and calls post function.
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData);
    postNewMeal(formToJson);
    //Calls getMeals function to collect updated 'meals' data from database.
    getMeals();
    setSuccessMessage(`${inputMealName} has been submitted!`);
    // Resets the form fields.
    event.target.reset();
    // After 3 seconds the success message is removed from display.
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  

  return (
    <div className="addMealBackdrop">
      <form
        className="addMealForm"
        onSubmit={handleFormSubmit}
        data-testid="add-meal-form"
      >
        <h3 className="addMealTitle">Add a New Meal</h3>

        {errorMessage && (
          <p className="addMealErrorMessage" data-testid="error-message-element">{errorMessage}</p>
        )}
        {successMessage && (
          <p data-testid="success-message-element">{successMessage}</p>
        )}
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
