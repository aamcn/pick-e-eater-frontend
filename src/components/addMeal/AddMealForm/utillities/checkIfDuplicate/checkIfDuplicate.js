// Function to check if the input meal name is a duplicate.
export function checkIfDuplicate(
  allMealNames,
  setErrorMessage,
  setIsMealDuplicate,
  inputMealName,
) {
  // Check if the inputMealName exists in allMealNames array, if true update errorMessage and isMealDuplicate.
  if (allMealNames.includes(inputMealName.toLowerCase())) {
    setErrorMessage(`${inputMealName} already exists`);
    setIsMealDuplicate(true);
  } else {
    // If not a duplicate, clear any previous error messages and set duplicate flag to false.
    setErrorMessage(null);
    setIsMealDuplicate(false);
  }
}
