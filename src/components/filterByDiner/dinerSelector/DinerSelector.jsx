import { useEffect } from "react";
import CheckBoxTemplate from "../checkBoxTemplate/CheckBoxTemplate";
import { collectDinerDislikes } from "./utilities/collectDinerDislikes/collectDinerDislikes";
import "./dinerSelector.scss";
function DinerSelector({
  allDiners,
  setDislikedMeals,
  selectedDiners,
  setSelectedDiners,
}) {
  /*
    Calls the function to collect diners dislikes everytime 'selectedDiners' is updated.
  */
  useEffect(() => {
   setDislikedMeals(collectDinerDislikes(selectedDiners));
  }, [selectedDiners]);


console.log("render")

  return (
    <div className="diner-selector-container" data-testid="diner-selector">
      <hr></hr>
      <div className="diner-selector-title" data-testid="diner-selector-title">
        <h3 className="diner-selector-title">Choose Who's Eating</h3>
      </div>
      <div className="diner-check-boxes">
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
    </div>
  );
}

export default DinerSelector;
