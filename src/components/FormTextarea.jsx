import PropTypes from "prop-types";

const FromTextarea = ({ name, type, placeholder, register, error }) => {
  return (
    <div>
      <textarea
        name={name}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 bg-gray-200 w-full rounded outline-none"
        {...register}
      ></textarea>
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
};

FromTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

FromTextarea.defaultProps = {
  type: "text",
};

export default FromTextarea;
