import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import Container from 'components/Container/Container';
import { FiX, FiMenu, FiLogOut } from 'react-icons/fi';
import ModalLogout from 'components/Modal/ModalLogout';

const Navbar = () => {
  // -------------
  // HANDLE LOGOUT
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const toggleModalLogout = () => setOpenModalLogout(!openModalLogout);
  // --------------
  const userNavigationLogin = [
    {
      name: 'Đăng xuất',
      href: '#',
      onClick: toggleModalLogout,
      icon: <FiLogOut className="inline mr-2" size="1rem" />,
    },
  ];

  return (
    <>
      <ModalLogout isOpen={openModalLogout} toggleModal={toggleModalLogout} />
      <div className="w-screen py-2 bg-white ">
        <Container className="flex items-center around-20 h-25">
          <Disclosure as="nav" className="w-full h-full">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center flex-auto h-full">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        VoiceGPT
                      </Link>
                    </div>
                  </div>
                  <div className="hidden xl:block">
                    {/* Show avatar after login on pc */}
                    {userNavigationLogin.map(
                      (item) =>
                        !item?.isHide && (
                          <Disclosure.Button
                            key={`user-nav-mobile-${item.name}`}
                            as={'button'}
                            className="block w-full"
                          >
                            <Link
                              to={item?.href}
                              onClick={item.onClick}
                              className="block w-full px-3 py-2 text-base font-medium rounded-md hover:bg-gray-700 hover:text-white"
                            >
                              {item?.icon}
                              {item?.name}
                            </Link>
                          </Disclosure.Button>
                        ),
                    )}
                  </div>
                  <div className="flex xl:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <FiX className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <FiMenu className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
                {/* Mobile menu button dropdown */}
                <Disclosure.Panel className="xl:hidden bg-black-2 animate-fade-in">
                  <div className="pt-4 pb-3 border-gray-700">
                    <div className="px-2 space-y-1">
                      {userNavigationLogin.map(
                        (item) =>
                          !item?.isHide && (
                            <Disclosure.Button
                              key={`user-nav-mobile-${item.name}`}
                              as={'button'}
                              className="block w-full text-left "
                            >
                              <Link
                                to={item?.href}
                                onClick={item.onClick}
                                className="block w-full px-3 py-2 text-base font-medium rounded-md hover:bg-gray-700 hover:text-white"
                              >
                                {item?.icon}
                                {item?.name}
                              </Link>
                            </Disclosure.Button>
                          ),
                      )}
                    </div>
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
