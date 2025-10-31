import "./toolBarButton.scss";

function ToolBarButton({
  topText,
  bottomText,
  toggleValue,
  toolButtonIcon,
  toggleFormDisplay,
}) {
  //On click function calls the 'toggleFormDisplay' function from props and passes 'toggleValue' as the argument.
  const handleToolButtonClick = () => {
    toggleFormDisplay(toggleValue);
  };

  return (
    <div
      className="toolBarButtonContainer"
      data-testid="toolbar-button-container"
    >
      <div
        onClick={handleToolButtonClick}
        value={toggleValue}
        className="toolBarButton"
        data-testid="tool-button"
      >
        <p className="toolButtonTopText" data-testid="tool-button-top-text">
          {topText}
        </p>
        <img
          className="toolButtonImage"
          src={toolButtonIcon}
          data-testid="tool-button-icon"
        />
        <p
          className="toolButtonBottomText"
          data-testid="tool-button-bottom-text"
        >
          {bottomText}
        </p>
      </div>
    </div>
  );
}

export default ToolBarButton;
