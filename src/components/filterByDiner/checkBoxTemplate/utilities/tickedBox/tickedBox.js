// Ticked box functionality, adds or removes a diner from the selectedDiners list depending on isClicked status.
export function tickedBox(
  selectedDiners,
  setIsClicked,
  isClicked,
  diner,
  setSelectedDiners,
) {
  if (!isClicked)
    // Add diner to selectedDiners
    setSelectedDiners((selectedDiners) => [...selectedDiners, diner]);
  setIsClicked(true);
  if (isClicked) {
    // Remove diner from selectedDiners
    const filteredDiners = selectedDiners.filter((value) => value != diner);
    setSelectedDiners(filteredDiners);
    setIsClicked(false);
  }
}
