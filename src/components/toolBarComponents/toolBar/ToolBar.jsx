import "./toolBar.scss";
import toolIcon from "../../../assets/svg/toolBarIcon.svg";

function ToolBar({ toolButtonsClassName, setToolButtonsClassName }) {

  /* 
  On Click: If ToolButtonsClassName is "toolBarButtons" then it's value is set to "toolBarButtons, hidden".
  Else ToolButtonsClassName is set to "toolBarButtons"
  */
  const toggleToolButtonsDisplay = () => {
    toolButtonsClassName == "toolBarButtons" ? setToolButtonsClassName("toolBarButtons, hidden") :
      setToolButtonsClassName("toolBarButtons");
  };

  return (
    <div className="toolBarContainer">
      <button
        onClick={toggleToolButtonsDisplay}
        className="toolBarActionButton"
      >
        <img width="40vw" src={toolIcon}></img>
      </button>
    </div>
  );
}

export default ToolBar;
