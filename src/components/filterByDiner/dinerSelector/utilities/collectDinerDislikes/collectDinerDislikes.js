export function collectDinerDislikes(selectedDiners) {
  let dislikesArray = [];
  //For each diner, copies their dislikes array into the 'dislikesArray'.
  selectedDiners.map((diner) => {
    dislikesArray = [...dislikesArray, ...diner.dislikes];
  });
  //Removes duplicate dislikes from the 'dislikedArray' before storing it in 'dislikedMeals' state.
  let unique = [...new Set(dislikesArray)];
  return(unique);
}
