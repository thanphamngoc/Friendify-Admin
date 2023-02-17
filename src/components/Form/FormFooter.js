import ButtonRound from "components/Button/ButtonRound";
import PropTypes from 'prop-types';

const FormFooter = ({ onClickBack, onClickAccept, isLoading, disabled, acceptText, onClickDelete }) => {
  return (
    <div className="flex justify-between px-4 border-t sm:px-12 py-9">
      <div className="flex space-x-4">
        {onClickBack && (
          <ButtonRound
            className="font-bold uppercase min-w-40"
            type="button"
            onClick={onClickBack}
          >
            Back
          </ButtonRound>
        )}
        <ButtonRound
          className="font-bold text-white uppercase border-0 min-w-40 bg-slate-900"
          disabled={disabled}
          isLoading={isLoading}
          onClick={onClickAccept}
          type="submit"
        >
          {acceptText || 'Accept'}
        </ButtonRound>
      </div>
      {onClickDelete && (
          <ButtonRound
            className="font-bold uppercase min-w-40"
            color="danger"
            type="button"
            onClick={onClickDelete}
          >
            Delete
          </ButtonRound>
        )}
    </div>
  );
};

FormFooter.propTypes = {
  onClickBack: PropTypes.func,
  onClickAccept: PropTypes.func,
  onClickDelete: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormFooter;