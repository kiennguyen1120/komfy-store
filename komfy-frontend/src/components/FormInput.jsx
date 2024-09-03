const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control ">
      <input
        placeholder="search"
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};
export default FormInput;
