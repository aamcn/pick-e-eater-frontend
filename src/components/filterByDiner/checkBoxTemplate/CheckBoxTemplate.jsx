import "./checkBoxTemplate.scss";
import { useState } from "react";

function CheckBoxTemplate({ diner, setSelectedDiners, selectedDiners }) {
  const [isClicked, setIsClicked] = useState(false);
  /*
    Adds or removes a diner depending on whether the checkbox is checked or unchecked.
    If checkbox is checked, insert the defaultValue (A diner) into the selectedDiners array and updates state.
    If checkbox is unchecked, filter the defaultValue (diner) from the selectedDiners array and updates state.
  */
  const tickedBox = (event) => {
    if (!isClicked)
      setSelectedDiners((selectedDiners) => [...selectedDiners, diner]);
    setIsClicked(true);
    if (isClicked) {
      const filteredDiners = selectedDiners.filter((value) => value != diner);
      setSelectedDiners(filteredDiners);
      setIsClicked(false);
    }
  };

  return (
    <div
      onClick={tickedBox}
      className={isClicked ? "dinerCheckBox, clicked" : "dinerCheckBox"}
    >
      <div className="plateCenterShape">
        <p>{diner.name}</p>
      </div>
    </div>
  );
}

export default CheckBoxTemplate;
