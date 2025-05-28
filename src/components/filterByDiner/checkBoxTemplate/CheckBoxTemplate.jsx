import "./checkBoxTemplate.scss"

function CheckBoxTemplate({ diner, setSelectedDiners, selectedDiners }) {
  /*
    Adds or removes a diner depending on whether the checkbox is checked or unchecked.
    If checkbox is checked, insert the defaultValue (A diner) into the selectedDiners array and updates state.
    If checkbox is unchecked, filter the defaultValue (diner) from the selectedDiners array and updates state.
  */
  const tickedBox = (event) => {
    if (event.target.checked)
      setSelectedDiners((selectedDiners) => [...selectedDiners, diner]);
    if (!event.target.checked) {
      const filteredDiners = selectedDiners.filter((value) => value != diner);
      setSelectedDiners(filteredDiners);
    }
  };

  return (
    <div className='dinerCheckBox' onChange={tickedBox}>
      <label htmlFor={diner.name}>{diner.name}</label>
      <input
        defaultValue={diner}
        id={diner.name}
        name={diner.name}
        type="checkbox"
      />
    </div>
  );
}

export default CheckBoxTemplate;
