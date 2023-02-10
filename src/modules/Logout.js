import { useNavigate } from "react-router-dom";
import { USER_TOKEN } from "utils/storage";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    USER_TOKEN.delete();
    navigate('login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;