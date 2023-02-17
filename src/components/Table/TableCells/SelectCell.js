import SelectBox from 'components/SelectBox';
import PropTypes from 'prop-types';

const SelectCell = ({ selected, list, onChange }) => {
  return (
    <div className="text-center">
      <SelectBox list={list} selected={selected} onChange={onChange} />
    </div>
  );
};

SelectCell.propTypes = {
  selected: PropTypes.objectOf(PropTypes.any),
  list: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func
};

export default SelectCell;
