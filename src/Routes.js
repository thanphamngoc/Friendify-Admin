import Home from "views/Home";
import Login from "views/Login";
import PageNotFound from "views/PageNotFound";
import { Route, Routes as Router } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Routes;