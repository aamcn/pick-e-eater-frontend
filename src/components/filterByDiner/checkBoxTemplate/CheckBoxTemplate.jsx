import "./checkBoxTemplate.scss";
import { useState } from "react";
import { tickedBox } from "./utilities/tickedBox/tickedBox";

function CheckBoxTemplate({ diner, setSelectedDiners, selectedDiners }) {
  const [isClicked, setIsClicked] = useState(false);

  /*
    Adds or removes a diner depending on the state of the 'isClicked' boolean.
    If checkbox is checked, insert the defaultValue (A diner) into the selectedDiners array and updates state.
    If checkbox is NOT checked, filter the defaultValue (diner) from the selectedDiners array and updates state.
  */

  const handleClick = () => {
    tickedBox(
      selectedDiners,
      setIsClicked,
      isClicked,
      diner,
      setSelectedDiners,
    );
  };

  return (
    <div
      onClick={handleClick}
      className={isClicked ? "dinerCheckBox, clicked" : "dinerCheckBox"}
      data-testid="diner-checkbox"
    >
      <div className="plateCenterShape">
        <p>{diner.name}</p>
      </div>
    </div>
  );
}

export default CheckBoxTemplate;
