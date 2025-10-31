import axios from "axios";
//Fetches peopleData from the people database table and stores it in state

export async function getDiners() {
  const dinerData = await axios
    .get(
      "https://pick-e-eater-backend-production.up.railway.app/diners/",
      { method: "cors" },
      { withCredentials: true },
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return dinerData;
}
