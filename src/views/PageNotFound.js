import ButtonRound from "components/Button/ButtonRound";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-2xl p-4 bg-white rounded">
        <p className="text-4xl ">PageNotFound</p>
        <ButtonRound
          className="mt-5 border border-slate-800"
          onClick={() => { navigate('/'); }}
        >
          Back to Home
        </ButtonRound>
      </div>
    </div>
  );
};

export default PageNotFound;