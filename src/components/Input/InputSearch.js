import classNames from 'classnames';
import Input from './Input';
import { FiSearch } from 'react-icons/fi';

const InputSearch = ({ defaultValue, onChange }) => {
  return (
    <div className="flex items-center group">
      {!defaultValue && (
        <FiSearch size={26} className=" text-secondary group-hover:hidden" />
      )}
      <Input
        type="text"
        size="sm"
        className={classNames(
          ' transition-all',
          defaultValue ? 'inline-block' : 'hidden w-0 group-hover:inline-block group-hover:w-auto'
        )}
        defaultValue={defaultValue}
        onChange={onChange} />
    </div>
  );
};

export default InputSearch;