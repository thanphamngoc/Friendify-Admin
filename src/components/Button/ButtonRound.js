import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpinnerLoading from 'components/SpinnerLoading';

const ButtonRound = ({ children, className = '', isLoading, disabled = false, color = '', ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        'flex items-center rounded-full justify-center transition-opacity',
        disabled ? 'opacity-50 pointer-events-none' : 'hover:opacity-80',
        color === 'primary' && 'bg-primary text-white',
        !className?.includes('border') && 'border',
        !className?.includes('px') && 'px-5',
        !className?.includes('py') && 'py-2',
        className,
      )}
    >
      {children} {isLoading && <SpinnerLoading className="ml-2" size="sm" color="white" />}
    </button>
  );
};

ButtonRound.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ButtonRound;
