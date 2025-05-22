import { useEffect, useState } from "react"
import TickBoxTemplate from "./TickBoxTemplate"

function PeopleSelector({ people }) {

    const [selectedPeople, setSelectedPeople] = useState([])

    useEffect(() =>{
        console.log(selectedPeople)
    }, [selectedPeople])
    

    return (
        <form>
            {people && people.map(person => {
                return <TickBoxTemplate person={person}  selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople}/>
            })}
        </form>
    )
}

export default PeopleSelector