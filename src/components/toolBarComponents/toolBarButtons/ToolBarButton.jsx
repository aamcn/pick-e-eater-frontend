import "./toolBarButton.scss"

function ToolBarButton({ topText, bottomText, toggleValue, randomMealIcon, toggleFormDisplay }) {
   
    const handleToolButtonClick = () => {
      toggleFormDisplay(toggleValue)
    }
   
    return (
            <div
                onClick={handleToolButtonClick}
                value={toggleValue}
                className="toolBarButton"
            >
                <p className="toolButtonTopText" value="randomMealForm"  >{topText}</p>
                <img className="toolButtonImage"  src={randomMealIcon}></img>
                <p className="toolButtonBottomText" >{bottomText}</p>
            </div>
    )
}

export default ToolBarButton