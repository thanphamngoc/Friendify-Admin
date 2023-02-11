import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';

const ModalTitle = ({ children }) => {
  return (
    <Dialog.Title
      as="h3"
      className="p-4 mt-2 mb-3 text-2xl font-bold leading-6 text-left border-b-2 border-black"
    >
      {children}
    </Dialog.Title>
  );
};

ModalTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalTitle;
