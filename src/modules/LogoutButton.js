import ModalLogout from "components/Modal/ModalLogout";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";

const LogoutButton = ({ className }) => {

  const [openModalLogout, setOpenModalLogout] = useState(false);
  const toggleModalLogout = () => setOpenModalLogout(!openModalLogout);

  return (
    <>
      <ModalLogout isOpen={openModalLogout} toggleModal={toggleModalLogout} />
      <button
        onClick={toggleModalLogout}
        className={`px-3 py-2 ${className}`}
      >
        <FiLogOut className="inline mr-2" size="1rem" />
        Sign out
      </button>
    </>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string
};
LogoutButton.defaultProps = {
  className: ''
};

export default LogoutButton;
