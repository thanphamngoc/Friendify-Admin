import classnames from 'classnames';
import PropTypes from 'prop-types';

export const ErrorSpan = ({ message }) => {
  return message && <span className={`text-xs text-red-400 ${message ? '' : 'opacity-0'}`}>* {message || 'Invalid'}</span>;
};

ErrorSpan.propTypes = {
  message: PropTypes.string,
};

const Input = ({ className, isValid = false, size, ...props }) => {
  return (
    <input
      {...props}
      className={classnames(
        className,
        size === 'sm' ? 'p-2' : 'p-4',
        'bg-transparent rounded-xl w-full border focus:outline-none',
        props.disabled && 'opacity-70',
        isValid && 'border-red-400',
      )}
    />
  );
};

Input.propTypes = {
  size: PropTypes.oneOf(['sm', PropTypes.any]),
  className: PropTypes.string,
  isValid: PropTypes.bool,
};
Input.errorText = ErrorSpan;


export const Label = ({ children, htmlFor }) => {
  return <div className="mb-2"><label htmlFor={htmlFor}>{children}</label></div>;
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

Input.label = Label;


export const InputCustom = ({ className, register, label, rules, ...rest }) => {
  return (
    <input
      {...rest}
      {...register(label, rules)}
      className={classnames(
        'w-full p-2 px-4 border-gray-200 border focus:outline-none',
        rest.disabled && 'opacity-70',
        className,
      )}
    />
  );
};

InputCustom.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  register: PropTypes.func,
};

export default Input;
