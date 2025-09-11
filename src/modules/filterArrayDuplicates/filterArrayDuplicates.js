// Push entry to array if it doesn't already exist in array.
export function filterArrayDuplicates(array, entry) {
  if (!entry) {
    throw new Error("No entry provided to filterArrayDuplicates function");
  }
  !array.includes(entry) ? array.push(entry) : null;
}
