import PropTypes from "prop-types";

const FormSelect = ({ label, name, register, error }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-semibold">
        {label}
      </label>
      <select
        name={name}
        id="jobRole"
        className="px-4 py-2 bg-gray-200 w-full rounded outline-none"
        {...register}
      >
        <option value="">--Select Job--</option>
        <option value="ui-developer">UI Developer</option>
        <option value="backend-developer">Backend Developer</option>
        <option value="database-developer">Database Developer</option>
        <option value="fullstack-developer">Fullstack Developer</option>
      </select>
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default FormSelect;
