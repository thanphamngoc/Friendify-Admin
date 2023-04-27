import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function SelectBox({ selected, list, onChange }) {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown
                className="opacity-40"
                size={20}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list?.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none ${active ? 'bg-primary-hover ' : ''}`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate py-2 ${selected ? 'font-medium bg-primary text-white' : 'font-normal'
                          }`}
                      >
                        <span className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-3',
                          selected? '' : 'text-opacity-0 text-white'
                        )}>
                          <FiCheckCircle className="w-5 h-5" aria-hidden="true" />
                        </span>
                        {item?.name}
                      </span>

                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

SelectBox.propTypes = {
  selected: PropTypes.objectOf(PropTypes.any),
  list: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func
};
