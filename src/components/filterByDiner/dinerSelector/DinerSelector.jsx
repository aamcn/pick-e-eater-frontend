import { useEffect } from "react";
import CheckBoxTemplate from "../checkBoxTemplate/CheckBoxTemplate";
import { collectDinerDislikes } from "./utilities/collectDinerDislikes/collectDinerDislikes";
import "./dinerSelector.scss";
function DinerSelector({
  allDiners,
  setDislikedMeals,
  selectedDiners,
  setSelectedDiners
}) {
  /*
    Calls the function to collect diners dislikes everytime 'selectedDiners' is updated.
  */
  useEffect(() => {
    collectDinerDislikes(selectedDiners, setDislikedMeals);
  }, [selectedDiners, setDislikedMeals]);


  return (
    <div className="dinerSelectorContainer" data-testid="diner-selector">
      <hr></hr>
      <div className="titleStick" data-testid="diner-selector-title">
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
