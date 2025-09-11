import axios from "axios";
//Fetches peopleData from the people database table and stores it in state

export function getDiners(setAllDiners) {
  axios
    .get(
      "https://pick-e-eater-backend-production.up.railway.app/diners/",
      { method: "cors" },
      { withCredentials: true },
    )
    .then(function (response) {
      setAllDiners(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
