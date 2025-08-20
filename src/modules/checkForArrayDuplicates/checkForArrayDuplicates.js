
export  function checkForArrayDuplicates(array, entry) {
    !array.includes(entry) ? array.push(entry) : null;
  }