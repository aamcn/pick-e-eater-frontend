
//Extracts disliked meals from the currently selected diners and stores them in 'dislikesArray'.
export function collectDinerDislikes(selectedDiners, setDislikedMeals) {
    let dislikesArray = [];
  //'SelectedDiners' is mapped (diner) and each of their dislikes are mapped (dislikedMeal) and pushed to 'dislikesArray'.
    selectedDiners.map(diner =>{diner.dislikes.map(dislikedMeal => {dislikesArray.push(dislikedMeal)} )
  })
    //Removes duplicate dislikes from the 'dislikedArray' before setting it to 'dislikedMeals' state.
    let unique = [...new Set(dislikesArray)];
    setDislikedMeals(unique);
  };