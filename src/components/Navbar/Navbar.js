import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Container from 'components/Container/Container';
import { FiX, FiMenu, FiUser } from 'react-icons/fi';
import { useGetUserLogin } from 'store/userLogin/hook';
import classNames from 'classnames';
import LogoutButton from 'modules/LogoutButton';
import { locations } from 'Routes';

const Navbar = () => {
  const userLogin = useGetUserLogin();

  const menuButtonClass = 'w-full text-left rounded hover:bg-gray-700 hover:text-white';

  const userNavigationLogin = [
    {
      id: 'account-settings',
      name: 'Account Settings',
      href: locations.account,
      // onClick: toggleModalLogout,
      icon: <FiUser className="inline mr-2" size="1rem" />,
    },
    {
      id: 'divider-1',
      component: <hr />
    },
    {
      id: 'sign-out',
      component: <LogoutButton className={menuButtonClass} />
    },
  ];

  return (
    <>
      <div className="w-screen py-2 bg-white ">
        <Container className="flex items-center around-20 h-25">
          <Disclosure as="nav" className="w-full h-full">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center flex-auto h-full">
                    <div className="flex-shrink-0 text-2xl font-bold">
                      <Link to="/" className="flex items-center space-x-2">
                        <img src="/images/logo-2.png" width={40} height={40} />
                        <span>Friendify PGX</span>
                      </Link>
                    </div>
                  </div>
                  {/* Show avatar after login on pc */}
                  <div className="hidden xl:block">
                    <div className="flex items-center ml-4 xl:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative px-6 py-4">
                        <Menu.Button className="flex items-center max-w-xs focus:outline-none">
                          <span className="sr-only">Open user menu</span>
                          <div className="mr-2 text-left">
                            <p>{userLogin?.fullName}</p>
                          </div>
                          <img
                            className="w-8 h-8 ml-2 bg-white border rounded-full"
                            src={userLogin?.avatar?.url || '/images/user-default.png'}
                            alt="avatar"
                          />
                        </Menu.Button>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 w-48 p-1 mt-2 text-sm origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigationLogin.map((item) => !item?.isHide && (
                              item?.component ? (
                                <React.Fragment key={`user-nav-mobile-${item.id}`}>
                                  {item?.component}
                                </React.Fragment>
                              ) : (
                                <Menu.Item
                                  key={item.id}
                                  className={menuButtonClass}
                                >
                                  {({ active }) => (
                                    <Link
                                      to={item?.href}
                                      onClick={item?.onClick}
                                      className={classNames(
                                        active ? 'text-primary' : '',
                                        'block px-3 py-2',
                                      )}
                                    >
                                      {item?.icon}
                                      {item?.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              )
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  {/* Mobile menu button */}
                  <div className="flex xl:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <FiX className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <FiMenu className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  {/* --------------- */}
                </div>
                {/* Mobile menu button dropdown */}
                <Disclosure.Panel className="xl:hidden bg-black-2 animate-fade-in">
                  <div className="px-2 space-y-1 ">
                    {userNavigationLogin.map((item) => !item?.isHide && (item?.component
                      ? (
                        <React.Fragment key={`user-nav-mobile-${item.id}`}>
                          {item?.component}
                        </React.Fragment>
                      ) : (
                        <Disclosure.Button
                          key={`user-nav-mobile-${item.id}`}
                          as={'button'}
                          className={menuButtonClass}
                        >
                          <Link
                            to={item?.href}
                            onClick={item.onClick}
                            className="block px-3 py-2 "
                          >
                            {item?.icon}
                            {item?.name}
                          </Link>
                        </Disclosure.Button>
                      )))
                    }
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
