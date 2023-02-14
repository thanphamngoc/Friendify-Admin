import { toast } from 'react-toastify';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const SuccessToast = ({ title, message }) => {
  return (
    <>
      <div className="flex items-center">
        <FiCheckCircle size={20} className="text-green-500" />
        <span className="ml-2">{title || 'Successful'}</span>
      </div>
      <div className="mt-2">
        <span>{message}</span>
      </div>
    </>
  );
};

SuccessToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
};

const ErrorToast = ({ title, message }) => {
  return (
    <>
      <div className="flex items-center">
        <FiXCircle size={20} className="text-red-500" />
        <span className="ml-2">{title || 'Error'}</span>
      </div>
      <div className="px-2 mt-2 ">
        <span>{message}</span>
      </div>
    </>
  );
};

ErrorToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
};

const WarningToast = ({ title, message }) => (
  <>
    <div className="flex items-center">
      <FiAlertTriangle size={20} className="text-yellow" />
      <span className="ml-2">{title || 'Warning'}</span>
    </div>
    <div className="mt-2">
      <span>{message}</span>
    </div>
  </>
);

WarningToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
};

const InfoToast = ({ title, message }) => (
  <>
    <div className="flex items-center">
      <FiInfo size={20} className="text-blue" />
      <span className="ml-2">{title || 'Infomation'}</span>
    </div>
    <div className="mt-2">
      <span>{message}</span>
    </div>
  </>
);

InfoToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
};

export function showToastSuccess(title, message) {
  toast.dark(<SuccessToast title={title} message={message} />, {
    hideProgressBar: true,
  });
}

export function showToastError(title, message) {
  toast.dark(<ErrorToast title={title} message={message} />, {
    hideProgressBar: true,
  });
}
