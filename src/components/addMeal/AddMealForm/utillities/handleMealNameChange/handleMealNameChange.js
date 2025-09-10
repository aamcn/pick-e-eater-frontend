// Function to handle changes to the meal name input field.
export function handleMealNameChange(event, setInputMealName) {
  setInputMealName(event.target.value);
  console.log(event.target.value);
}
