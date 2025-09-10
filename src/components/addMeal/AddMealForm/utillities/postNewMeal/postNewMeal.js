import axios from "axios";

// Function to post new meal form data to the server.
export function postNewMeal(formData) {
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
