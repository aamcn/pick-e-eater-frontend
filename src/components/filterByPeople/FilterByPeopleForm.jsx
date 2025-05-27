import { useEffect, useState } from "react";
import TickBoxTemplate from "./TickBoxTemplate";

function PeopleSelector({ allDiners, setDislikedMeals }) {
  const [selectedDiners, setSelectedDiners] = useState([]);
  const [hidden, setIsHidden] = useState(true);

  //Extracts disliked meals from the currently selected diners and stores them in 'dislikesArray'.
  const collectDinerDislikes = () => {
    let dislikesArray = [];
    selectedDiners.map((diner) => {
      diner.dislikes.map((diner) => {
        dislikesArray.push(diner);
      });
    });
    //Removes duplicate dislikes from the array before setting it to state.
    let unique = [...new Set(dislikesArray)];
    setDislikedMeals(unique);
  };

  //When button is clicked it toggles the display of the form depending on its current state.
  const handleToggle = (event) => {
    event.preventDefault();
    if (hidden == true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  /*
  Calls the function to collect diners dislikes everytime selectedPeople is updated so that disliked meals can be filtered
  immediately.
  */
  useEffect(() => {
    collectDinerDislikes();
  }, [selectedDiners]);

  return (
    <div>
      <button onClick={handleToggle}>Choose Diners</button>
      {!hidden && (
        <form className="form">
          {allDiners &&
            allDiners.map((diner) => {
              return (
                <TickBoxTemplate
                  key={`${diner.name}key`}
                  diner={diner}
                  selectedDiners={selectedDiners}
                  setSelectedDiners={setSelectedDiners}
                />
              );
            })}
        </form>
      )}
    </div>
  );
}

export default PeopleSelector;
