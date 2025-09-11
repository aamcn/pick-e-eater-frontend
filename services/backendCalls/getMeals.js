import axios from "axios";
//Fetches mealsData from the meals database table and stores it in state
export function getMeals(setFilteredMeals, setAllMeals) {
  axios
    .get(
      "https://pick-e-eater-backend-production.up.railway.app/meals/",
      { method: "cors" },
      { withCredentials: true },
    )
    .then(function (response) {
      setFilteredMeals(response.data);
      setAllMeals(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
