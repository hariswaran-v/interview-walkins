import PropTypes from "prop-types";

const Forminput = ({ name, type, placeholder, register, error }) => {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 bg-gray-200 w-full rounded outline-none"
        {...register}
      />
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
};

Forminput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
};

Forminput.defaultProps = {
  type: "text",
};

export default Forminput;
