import "./toolBar.scss";
import toolIcon from "../../../assets/svg/toolBarIcon.svg"

function ToolBar({ toolButtonsClassName, setToolButtonsClassName }) {

  const toggleToolButtonsDisplay = (event) => {
    event.preventDefault();
    if (toolButtonsClassName == 'toolBarButtons') {
      setToolButtonsClassName('toolBarButtons, hidden');
    } else {
      setToolButtonsClassName('toolBarButtons');
    }
  }

  return (
    <div className="toolBarContainer">
      <button onClick={toggleToolButtonsDisplay} className="toolBarActionButton"><img width='40vw' src={toolIcon}></img></button>
    </div>
  );
}

export default ToolBar;
