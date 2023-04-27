import { Disclosure, Tab, Transition } from '@headlessui/react';
import { FiChevronUp } from 'react-icons/fi';
import SettingForm from './SettingForm';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';


const categories = {
  General: [
    {
      label: 'Use point',
      children: <SettingForm keyApi="use-point" />
    },
    {
      label: 'Email',
      children: <SettingForm keyApi="email" />
    },
    {
      label: 'About us',
      children: <SettingForm keyApi="about-us" />
    },
  ],
  Reward: [
    {
      label: 'Point reward',
      children: <SettingForm keyApi="point-reward" />
    },
  ],
};


export default function SettingDisclosure() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsQuery = searchParams.get('tab');

  const handleChangeQuery = (idx) => {
    searchParams.set('tab', idx);
    setSearchParams(searchParams);
  };

  return (
    <div className="mx-auto">
      <Tab.Group selectedIndex={tabsQuery}>
        <Tab.List className="flex p-1 space-x-2 rounded-xl w-fit">
          {Object.keys(categories).map((category, idx) => (
            <Tab
              key={category}
              onClick={() => {
                handleChangeQuery(idx);
              }}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5 text-slate-700',
                  'ring-white ring-opacity-60 ring-offset-1 ring-offset-slate-400 focus:outline-none focus:ring-1',
                  selected
                    ? 'bg-white shadow'
                    : 'text-slate-100 bg-slate-50/20 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((cateItem, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {cateItem.map((item) => (
                  <Disclosure key={item.label} defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className={classNames(
                          'flex justify-between w-full px-4 py-2 font-bold text-left rounded text-slate-900 bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75', 'my-3'
                        )}>
                          <span>{item.label}</span>
                          <FiChevronUp
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-slate-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel static className="px-4 pb-8 text-primary" >
                            {item.children}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
