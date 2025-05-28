import "./filterCheckBox.scss"

function FilterCheckBox({ field, onChange }) {
  return (
    <div className='filterCheckBox' onChange={onChange}>
      <label htmlFor={field}>{field}</label>
      <input
        icon={"-"}
        defaultChecked="checked"
        defaultValue={field}
        id={field}
        name={field}
        type="checkbox"
      />
    </div>
  );
}

export default FilterCheckBox;
