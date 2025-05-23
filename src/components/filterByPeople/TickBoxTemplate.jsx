function TickBoxTemplate({ person, setSelectedPeople, selectedPeople }) {
  const tickedBox = (event) => {
    if (event.target.checked)
      setSelectedPeople((selectedPeople) => [...selectedPeople, person]);
    if (!event.target.checked) {
      const t = selectedPeople.filter((value) => value != person);
      setSelectedPeople(t);
    }
  };

  return (
    <fieldset onChange={tickedBox}>
      <label htmlFor={person.name}>{person.name}</label>
      <input
        defaultValue={person}
        id={person.name}
        name={person.name}
        type="checkbox"
      />
    </fieldset>
  );
}

export default TickBoxTemplate;
