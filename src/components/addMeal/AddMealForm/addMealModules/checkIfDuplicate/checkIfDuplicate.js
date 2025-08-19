

export function checkIfDuplicate(allMealNames, setErrorMessage, setIsMealDuplicate, inputMealName){
    if(allMealNames.includes(inputMealName.toLowerCase())){
      setErrorMessage(`${inputMealName} already exists`)
      setIsMealDuplicate(true)
    } else {
      setErrorMessage(null)
      setIsMealDuplicate(false)
    }
  }