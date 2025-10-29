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
    getMeals();
    setSuccessMessage(`${inputMealName} has been submitted!`);
    event.target.reset();
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };


  return (
    <div className="add-meal-form-backdrop">
      <form
        className="add-meal-form"
        onSubmit={handleFormSubmit}
        data-testid="add-meal-form"
      >
        <h3 className="add-meal-title">Add a New Meal</h3>

        {errorMessage && (
          <p className="add-meal-error-message" data-testid="error-message-element">{errorMessage}</p>
        )}
        {successMessage && (
          <p data-testid="success-message-element">{successMessage}</p>
        )}
        <fieldset className="add-meal-fieldset">
          <label htmlFor="name">Meal Name: </label>
          <input
            onChange={handleMealNameChange}
            className="add-meal-input"
            id="name"
            name="name"
            type="text"
            required
          />
        </fieldset>
        <fieldset className="add-meal-fieldset">
          <label htmlFor="type">Type: </label>
          <input
            className="add-meal-input"
            id="type"
            name="type"
            type="text"
            required
          />
        </fieldset>
        <fieldset className="add-meal-fieldset">
          <label htmlFor="subType">Main Ingredient: </label>
          <input
            className="add-meal-input"
            id="subType"
            name="subType"
            type="text"
            required
          />
        </fieldset>
        <fieldset className="add-meal-fieldset">
          <label htmlFor="difficulty">Difficulty: </label>
          <input
            className="add-meal-input"
            type="text"
            id="difficulty"
            name="difficulty"
            required
          />
        </fieldset>
        <div className="add-meal-buttons">
          <button
            value="addMealForm"
            onClick={toggleFormDisplay}
            className="add-meal-button"
            type="submit"
          >
            Close
          </button>
          <button className="add-meal-button" type="submit">
            Submit
          </button>
          <button className="add-meal-button" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMealForm;
