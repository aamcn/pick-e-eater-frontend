// Function to handle changes to the meal name input field.
export function handleMealNameChange(event, setInputMealName) {
  if (!event || !event.target || typeof event.target.value !== "string") {
    throw new Error("Invalid event object");
  }
  if (typeof setInputMealName !== "function") {
    throw new Error("setInputMealName must be a function");
  }
  setInputMealName(event.target.value);
}
