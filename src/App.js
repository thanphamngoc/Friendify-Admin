import withUserLogined from "HOC/withUserLogined";
import Routes from "Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-slate-800">
      <Routes />
      <ToastContainer newestOnTop />
    </div>
  );
}

export default withUserLogined(App);
