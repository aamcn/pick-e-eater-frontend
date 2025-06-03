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
  toggleAddMealForm,
  toggleFormDisplay,
  getUsers
}) {
  const [hidden, setIsHidden] = useState(true);
  const [chosenDiner, setChosenDiner ] = useState(null);
  const [chosenDislikedMeals, setChosenDislikedMeals ] = useState([]);
  /* 
    prepares form data before posting to server by creating formData object from the event.target and coverts 
    it to JSON before passing it to the 'postFormData' function.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    chosenDislikedMeals.forEach(value =>  {
  bodyFormData.append("mealIdArray[]", value) // you have to add array symbol after the key name
})
    bodyFormData.append("dinerId", chosenDiner.id)
    const formToJson = axios.formToJSON(bodyFormData);
    postFormData(formToJson);
    console.log(formToJson)
  };

  //Function to post form to the server.
  function postFormData(formData) {
    console.log(formData)
    axios
      .post(
        "http://localhost:3000/diners/add-meals-to-dislikes",
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
    let index = event.target.value 
    console.log(allDiners)
    const t = allDiners.filter(diner => {
      if(diner.id == index )
        return diner
    })
    setChosenDiner(t[0])
  };

  

  useEffect(() =>{
  setChosenDislikedMeals([])
  if(chosenDiner){setChosenDislikedMeals(chosenDiner.dislikes)} 
  if(chosenDiner){console.log(chosenDiner.dislikes)}
   console.log(chosenDiner)
   getUsers()
  }, [chosenDiner])

 useEffect(() =>{
 
   console.log(chosenDislikedMeals)
  }, [chosenDislikedMeals])

  return (
    <div className="updateDislikesBackDrop">
      <form className="updateDislikesForm" onSubmit={handleFormSubmit}>
        <fieldset className="dinerSelectContainer">
          <label htmlFor="personId">Person:</label>
          <select id="personId" name="personId" onChange={handleSelectChange}>
            <option>Pick a Name</option>
            {allDiners &&
              allDiners.map((person) => {
                return <option value={person.id}>{person.name}</option>;
              })}
          </select>
        </fieldset>
        <fieldset className="mealsCheckBoxContainer">
          <label className="checkboxTitle" htmlFor="this">Meals:</label>
          {chosenDiner && allMeals.map(meal => {
            return <MealCheckBoxTemplate meal={meal} chosenDiner={chosenDiner} chosenDislikedMeals={chosenDislikedMeals} setChosenDislikedMeals={setChosenDislikedMeals} />
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





