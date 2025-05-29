import "./toolBar.scss";


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
      <button onClick={toggleToolButtonsDisplay} className="toolBarActionButton">+</button>
    </div>
  );
}

export default ToolBar;
