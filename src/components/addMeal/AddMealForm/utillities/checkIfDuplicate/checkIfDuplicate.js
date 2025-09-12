// Function to check if the input meal name is a duplicate.
export function checkIfDuplicate(
  allMealNames,
  setErrorMessage,
  setIsMealDuplicate,
  inputMealName,
) {
  // If inputMealName is null, undefined, or only whitespace, clear error message and duplicate flag.
  if (!inputMealName || inputMealName.trim() === "") {
    setErrorMessage("Input name cannot be empty.");
    setIsMealDuplicate(false);
    return;
  }
  // Check if the inputMealName exists in allMealNames array, if true update errorMessage and isMealDuplicate.
  if (allMealNames.includes(inputMealName.toLowerCase())) {
    setErrorMessage(`${inputMealName} is already on the list!`);
    setIsMealDuplicate(true);
  } else {
    // If not a duplicate, clear any previous error messages and set duplicate flag to false.
    setErrorMessage(null);
    setIsMealDuplicate(false);
  }
}
