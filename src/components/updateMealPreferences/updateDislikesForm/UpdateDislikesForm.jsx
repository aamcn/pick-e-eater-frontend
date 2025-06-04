import axios from "axios";
import { useEffect, useState } from "react";
import "./updateDislikesForm.scss";
import MealCheckBoxTemplate from "./MealCheckBoxTemplate";
/* 
  Renders a form allowing the user to select a diner and a meal, on form submission the diner ID and the meal ID
  is posted to the server storing the meal in the diners disliked meals column.
*/
function AddDislikesForm({
  allDiners,
  allMeals,
  toggleFormDisplay,
  getUsers}) {

  const [hidden, setIsHidden] = useState(true);
  const [chosenDiner, setChosenDiner] = useState(null);
  const [chosenDislikedMeals, setChosenDislikedMeals] = useState([]);
  /* 
    prepares form data before posting to server by creating formData object from the event.target and coverts 
    it to JSON before passing it to the 'postFormData' function.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    chosenDislikedMeals.forEach((value) => {
    bodyFormData.append("mealIdArray[]", value); // you have to add array symbol after the key name
    });
    bodyFormData.append("dinerId", chosenDiner.id);
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
  const handleSelectChange = (event) => {
    let index = event.target.value;
    const selectedDiner = allDiners.filter((diner) => {
      if (diner.id == index) return diner;
    });
    setChosenDiner(selectedDiner[0]);
  };

/*
On render chosenDislikedMeals is reset. When there is a 'chosenDiner' stored in state their
dislikes array is stored in chosenDislikedMeals. This is used to pre fillout the checkbox options
with the diners disliked meals stored in database.
*/
  useEffect(() => {
    setChosenDislikedMeals([]);
    if (chosenDiner) {
      setChosenDislikedMeals(chosenDiner.dislikes);
    }
    getUsers();
  }, [chosenDiner]);

  return (
    <div className="updateDislikesBackDrop">
      <form className="updateDislikesForm" onSubmit={handleFormSubmit}>
        <fieldset className="dinerSelectContainer">
          <label htmlFor="personId">Person:</label>
          <select className="dinerSelectorInput" id="personId" name="personId" onChange={handleSelectChange}>
            <option >Pick a Name</option>
            {allDiners &&
              allDiners.map((person) => {
                return <option value={person.id}>{person.name}</option>;
              })}
          </select>
        </fieldset>
        <fieldset className="mealsCheckBoxContainer">
          {chosenDiner &&
            allMeals.map((meal) => {
              return (
                <MealCheckBoxTemplate
                  meal={meal}
                  chosenDiner={chosenDiner}
                  chosenDislikedMeals={chosenDislikedMeals}
                  setChosenDislikedMeals={setChosenDislikedMeals}
                />
              );
            })}
        </fieldset>
        <div className="dislikesFormButtons">
          <button
            value="updateDislikesForm"
            onClick={toggleFormDisplay}
            className="dislikesFormButton"
            type="button"
          >
            Close
          </button>
          <button className="dislikesFormButton" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDislikesForm;
