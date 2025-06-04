import { useEffect, useState } from "react";
import CheckBoxTemplate from "../checkBoxTemplate/CheckBoxTemplate";
import "./dinerSelector.scss";
function DinerSelector({
  allDiners,
  setDislikedMeals,
  selectedDiners,
  setSelectedDiners,
}) {
  

  //Extracts disliked meals from the currently selected diners and stores them in 'dislikesArray'.
  const collectDinerDislikes = () => {
    let dislikesArray = [];
  //'SelectedDiners' is mapped (diner) and each of their dislikes are mapped (dislikedMeal) and pushed to 'dislikesArray'.
    selectedDiners.map(diner =>{diner.dislikes.map(dislikedMeal => {dislikesArray.push(dislikedMeal)} )
  })
    //Removes duplicate dislikes from the 'dislikedArray' before setting it to 'dislikedMeals' state.
    let unique = [...new Set(dislikesArray)];
    setDislikedMeals(unique);
  };

  /*
    Calls the function to collect diners dislikes everytime 'selectedPeople' is updated so that disliked meals can be filtered.
  */
  useEffect(() => {
    collectDinerDislikes();
  }, [selectedDiners]);

  return (
    <div className="dinerSelectorContainer">
      <hr></hr>
      <div className="titleStick">
        <h3 className="dinerSelectorTitle">Choose Who's Eating</h3>
      </div>
      <div className="dinerCheckBoxes">
        {allDiners &&
          allDiners.map((diner) => {
            return (
              <CheckBoxTemplate
                key={`${diner.name}key`}
                diner={diner}
                selectedDiners={selectedDiners}
                setSelectedDiners={setSelectedDiners}
              />
            );
          })}
      </div>
      <hr></hr>
    </div>
  );
}

export default DinerSelector;
