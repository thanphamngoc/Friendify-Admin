import Modal from './Modal';
import ModalTitle from './ModalTitle';
import ButtonRound from '../Button/ButtonRound';
import { USER_TOKEN } from 'utils/storage';
import { useNavigate } from 'react-router-dom';

const ModalLogout = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    USER_TOKEN.delete();
    navigate('login');
  };


  return (
    <Modal open={isOpen} onClose={toggleModal} className={'bg-white'}>
      <ModalTitle onClose={toggleModal}>Warning</ModalTitle>
      <div className="text-lg text-center">Do you still want to logout?</div>
      <div className="flex justify-center my-4">
        <ButtonRound onClick={toggleModal} className="mr-2 font-bold">
          Close
        </ButtonRound>
        <ButtonRound onClick={handleLogout} className="mr-2 font-bold text-red-500 border border-red-500">
          Logout
        </ButtonRound>
      </div>
    </Modal>
  );
};

export default ModalLogout;
