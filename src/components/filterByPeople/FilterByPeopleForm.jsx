import { useEffect, useState } from "react";
import TickBoxTemplate from "./TickBoxTemplate";


function PeopleSelector({ people, dislikedMeals, setDislikedMeals }) {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [hidden, setIsHidden] = useState(true)

  useEffect(() => {
    collectMeals();
  }, [selectedPeople]);

  const collectMeals = () => {
    let dislikesArray = [];
    selectedPeople.map((person) => {
      person.dislikes.map((entry) => {
        dislikesArray.push(entry);
      });
    });
    let unique = [...new Set(dislikesArray)];
    setDislikedMeals(unique);
  };


  const handleToggle = (event) => {
    event.preventDefault()
    if(hidden == true){
        setIsHidden(false)
    } else {
        setIsHidden(true)
    }
}

  useEffect(() => {}, [dislikedMeals]);

  return (
   <div>
    <button onClick={handleToggle}>Choose Diners</button>
    {!hidden && 
     <form>
      {people &&
        people.map((person) => {
          return (
            <TickBoxTemplate
              key={`${person.name}key`}
              person={person}
              selectedPeople={selectedPeople}
              setSelectedPeople={setSelectedPeople}
            />
          );
        })}
    </form>} 
   </div>
  );
}

export default PeopleSelector;
