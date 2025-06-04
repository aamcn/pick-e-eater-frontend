import axios from "axios";
import "./addMealForm.scss";
function AddMealForm({ toggleFormDisplay, getMeals }) {

  /* 
    prepares form data before posting to server by creating formData object from the event.target and coverts 
    it to JSON before passing it to the 'postFormData' function.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData(event.target);
    const formToJson = axios.formToJSON(bodyFormData);
    postFormData(formToJson);
    //Calls getMeals function to collect updated 'meals' data from database.
    getMeals();
  };

  //Posts passed in formData to the server.
  function postFormData(formData) {
    axios
      .post(
        "https://pick-e-eater-backend-production.up.railway.app/meals/add-new-meal",
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

  return (
    <div className="addMealBackdrop">
      <form className="addMealForm" onSubmit={handleFormSubmit}>
        <fieldset className="addMealFieldset">
          <label htmlFor="name">Meal Name: </label>
          <input
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
