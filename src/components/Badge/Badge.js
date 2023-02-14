import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Badge = ({ color, children, className, ...props }) => {
  const type = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-1 ',
    light: 'bg-white ',
    danger: 'bg-rose-400 ',
    info: 'bg-slate-300',
    warning: 'bg-yellow-400 ',
    success: 'bg-green-400 ',
    dark: 'bg-black text-white-1',
  };
  return (
    <span
      className={classNames(
        'rounded-full text-center font-bold px-2 max-w-full truncate ',
        className,
        type[color] || 'bg-none border',
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(Badge);
