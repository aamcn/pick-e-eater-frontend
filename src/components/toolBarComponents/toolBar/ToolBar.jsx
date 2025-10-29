import "./toolBar.scss";
import toolIcon from "../../../assets/svg/cookBook.svg";

function ToolBar({ toolButtonsClassName, setToolButtonsClassName }) {
  /* 
  On Click: If ToolButtonsClassName is "toolBarButtons" then it's value is set to "toolBarButtons, hidden".
  Else ToolButtonsClassName is set to "toolBarButtons"
  */
  const toggleToolButtonsDisplay = () => {
    toolButtonsClassName == "toolBarBackDrop"
      ? setToolButtonsClassName("toolBarBackDrop, hidden")
      : setToolButtonsClassName("toolBarBackDrop");
  };

  return (
    <div className="toolBarContainer" data-testid="tool-bar-container">
      <button
        onClick={toggleToolButtonsDisplay}
        className="toolBarActionButton"
        data-testid="tool-toggle-button"
      >
        <img className="toolBarIcon" src={toolIcon} data-testid="filter-meals-icon" alt="'Filter meals' Button Icon"></img>
      </button>
    </div>
  );
}

export default ToolBar;
