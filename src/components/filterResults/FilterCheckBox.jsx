function FilterCheckBox({ field, onChange }) {

  
  return (
    <fieldset onChange={onChange}>
      <label htmlFor={field}>{field}</label>
      <input
        icon={"-"}
        defaultChecked="checked"
        defaultValue={field}
        id={field}
        name={field}
        type="checkbox"
      />
    </fieldset>
  );
}

export default FilterCheckBox;
