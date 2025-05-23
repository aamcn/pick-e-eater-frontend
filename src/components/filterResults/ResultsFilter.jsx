import { useEffect, useState } from "react"
import FilterCheckBox from "./FilterCheckBox"

function ResultsFilter({ meals, currentPeopleMeals, filteredMeals, setFilteredMeals }) {

    const [difficultyFields, setDifficultyFields] = useState([])
    const [checkedDifficulties, setCheckedDifficulties] = useState([])
    const [mealTypeFields, setMealTypeFields] = useState([])
    const [checkedMealTypes, setCheckedMealTypes] = useState([])
    const [mealSubTypeFields, setMealSubTypeFields] = useState([])
    const [checkedMealSubTypes, setCheckedMealSubTypes] = useState([])

    function getMealDifficulties() {
        const difficultyArr = meals.map(meal => {
            return meal.difficulty
        })
        setDifficultyFields([...new Set(difficultyArr)])
    }

    function getMealTypes() {
        const mealTypeArr = meals.map(meal => {
            return meal.type
        })
        setMealTypeFields([...new Set(mealTypeArr)])
    }

    function getMealSubTypes() {
        const subTypeArr = meals.map(meal => {
            return meal.sub_type
        })
        setMealSubTypeFields([...new Set(subTypeArr)])
    }

    
    const handleDiffifcultyClick = (event) => {
        if (event.target.checked) setCheckedDifficulties(checkedDifficulties => [...checkedDifficulties, event.target.value])
        if (!event.target.checked) {
            const t = checkedDifficulties.filter(value => value != event.target.value)
            setCheckedDifficulties(t)
        }
    }

    const handleMealTypeClick = (event) => {
        if (event.target.checked) setCheckedMealTypes(checkedMealTypes => [...checkedMealTypes, event.target.value])
        if (!event.target.checked) {
            console.log(event.target.value)
            const t = checkedMealTypes.filter(value => value != event.target.value)
            setCheckedMealTypes(t)
        }
    }

    const handleMealSubTypeClick = (event) => {
        if  (event.target.checked) setCheckedMealSubTypes(checkedMealSubTypes => [...checkedMealSubTypes, event.target.value])
            if (!event.target.checked) {
            console.log(event.target.value)
            const r = checkedMealSubTypes.filter(value => value !== event.target.value)
            setCheckedMealSubTypes(r)
        }
    }

    function removeDiffMeals() {
        const filteredArray = currentPeopleMeals.filter(meal => {
          if (!checkedDifficulties.includes(meal.difficulty)) {
            return meal
          }
        })
        let arr2 =[]
        const typeFilter = filteredArray.filter(meal => {
            if (!checkedMealTypes.includes(meal.type)) {
                arr2.push(meal)
            }
        })
        let arr3 = []
        const subTypeFilter = arr2.filter(meal => {
            if (!checkedMealSubTypes.includes(meal.sub_type)) {
                arr3.push(meal)
              }
        })
        setFilteredMeals(arr3)
      }

      useEffect(() => {
        getMealTypes()
        getMealDifficulties()
        getMealSubTypes()
    }, [currentPeopleMeals])

    useEffect(() => {
        console.log(checkedMealTypes)
        console.log(checkedMealSubTypes)
        removeDiffMeals()
    }, [checkedDifficulties, checkedMealTypes, checkedMealSubTypes, currentPeopleMeals])


    return (
        <div>
            <h3>Filter</h3>
            {difficultyFields && difficultyFields.map(difficultyField => {
                return <FilterCheckBox field={difficultyField} onChange={handleDiffifcultyClick} />
            })}
            {mealTypeFields && mealTypeFields.map(typeField => {
                return <FilterCheckBox field={typeField} onChange={handleMealTypeClick} />
            })}
            {mealSubTypeFields && mealSubTypeFields.map(subTypeField => {
                return <FilterCheckBox field={subTypeField} onChange={handleMealSubTypeClick} />
            })}
        </div>
    )
}

export default ResultsFilter