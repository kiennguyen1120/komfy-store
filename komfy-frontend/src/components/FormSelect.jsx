const FormSelect = ({ name, options, defaultValue, size }) => {
  return (
    <div className="form-control">
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
