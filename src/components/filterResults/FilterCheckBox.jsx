
function FilterCheckBox({ field, onChange}) {
 
    return (

        <fieldset onChange={onChange}>
            <label htmlFor={field}>{field}</label>
            <input defaultValue={field} id={field} name={field} type='checkbox' />
        </fieldset>
    )
}

export default FilterCheckBox;