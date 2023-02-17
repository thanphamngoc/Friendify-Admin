import PropTypes from 'prop-types';

const SimpleCell = ({ className, data, onClick }) => {
  return <div
    className={className}
    onClick={onClick}
  >
    {data}
  </div>;
};

SimpleCell.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  onClick: PropTypes.func
};

export default SimpleCell;
