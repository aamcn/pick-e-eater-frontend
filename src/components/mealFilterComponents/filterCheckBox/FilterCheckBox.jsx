import { useEffect, useState } from "react";
import "./filterCheckBox.scss";

function FilterCheckBox({ field, onClick }) {
  const [isClicked, setIsClicked] = useState(true);

  const handleClicky = () => {
    if (isClicked == false) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    onClick(isClicked, field);
  }, [isClicked]);

  return (
    <div
      className={!isClicked ? "filterCheckBox, isClicked" : "filterCheckBox"}
      onClick={handleClicky}
    >
      <p className="filterOptionName">{field}</p>
    </div>
  );
}

export default FilterCheckBox;
