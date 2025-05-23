import { useEffect, useState } from "react";
import TickBoxTemplate from "./TickBoxTemplate";

function PeopleSelector({ people, dislikedMeals, setDislikedMeals }) {
  const [selectedPeople, setSelectedPeople] = useState([]);

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

  useEffect(() => {}, [dislikedMeals]);

  return (
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
    </form>
  );
}

export default PeopleSelector;
