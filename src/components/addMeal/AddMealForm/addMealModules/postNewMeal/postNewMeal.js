import axios from "axios";

export //Posts passed in formData to the server.
  function postNewMeal(formData) {
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