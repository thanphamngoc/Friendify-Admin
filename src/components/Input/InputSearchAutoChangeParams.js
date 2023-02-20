import classNames from 'classnames';
import Input from './Input';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------
// * REQUIRED PARAM-NAME PROPS
// * THIS COMPONENT WILL AUTO CHANGE [PARAM-NAME] PARAMS 
// * WE CAN USE IS-RESET-PARAMS PROPS TO RESET ALL PARAMS OR SET [PARAM-NAME] PARAMS
// ----------------------------------------------------------------
const InputSearchAutoChangeParams = ({ paramName, onAfterChange, isResetParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsTextSearch = searchParams.get(paramName);
  const inputSearchTimeoutRef = useRef();

  const handleChangeTextSearch = (e) => {
    clearTimeout(inputSearchTimeoutRef.current);
    inputSearchTimeoutRef.current = setTimeout(() => {
      if (isResetParams) {
        setSearchParams({ [paramName]: e.target.value });
      } else {
        searchParams.set(paramName, e.target.value);
        setSearchParams(searchParams);
      }
    }, 500);
    onAfterChange(e);
  };

  return (
    <div className="flex items-center group">
      {!paramsTextSearch && (
        <FiSearch size={26} className=" text-secondary group-hover:hidden" />
      )}
      <Input
        type="text"
        size="sm"
        className={classNames(
          ' transition-all',
          paramsTextSearch ? 'inline-block' : 'hidden w-0 group-hover:inline-block group-hover:w-auto'
        )}
        defaultValue={paramsTextSearch}
        onChange={handleChangeTextSearch} />
    </div>
  );
};

InputSearchAutoChangeParams.propTypes = {
  onAfterChange: PropTypes.func,
  isResetParams: PropTypes.bool,
  paramName: PropTypes.string.isRequired
};

InputSearchAutoChangeParams.defaultProps = {
  onAfterChange: () => { },
  isResetParams: true
};

export default InputSearchAutoChangeParams;