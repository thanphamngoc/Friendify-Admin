
import Routes from "Routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_TOKEN } from "utils/storage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = () => {
      const userlogined = USER_TOKEN.get();
      if (!userlogined) {
        navigate('/login');
      }
    };
    checkUserLogin();
    window.addEventListener('storage', checkUserLogin);
    return () => {
      window.removeEventListener('storage', checkUserLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-800">
      <Routes />
    </div>
  );
}

export default (App);
