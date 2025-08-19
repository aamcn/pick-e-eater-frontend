import { useEffect, useState } from "react";
import "./filterCheckBox.scss";

function FilterCheckBox({ clickFunction, field, setCheckedFields, checkedFields}) {
  const [isClicked, setIsClicked] = useState(true);


  /*
    If isClicked is 'true' isClicked is set to 'false'. If not isClicked is set to 'true'.
    This switches the div ClassName which changes the checkbox color signifying which options are selected or deselected.
  */
  const handleCheckBoxClick = () => {
    !isClicked ? setIsClicked(true) : setIsClicked(false);
    };

  /*
    When isClicked is updated, the onClick props function is called and the 'isClicked' value and 'field' props are
    passed as arguments.
   */
  useEffect(() => {
    clickFunction(isClicked, field, setCheckedFields, checkedFields);
  }, [isClicked, field]);

  return (  
    <div
      className={!isClicked ? "filterCheckBox, isClicked" : "filterCheckBox"}
      onClick={handleCheckBoxClick}
      data-testid="filter-checkbox-container"
    >
      <p className="filterOptionName">{field}</p>
    </div>
  );
}

export default FilterCheckBox;
