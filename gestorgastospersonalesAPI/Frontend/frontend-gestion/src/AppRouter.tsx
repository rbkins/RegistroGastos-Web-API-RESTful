import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/sistema";
import NotFound from "./pages/Notfound";
import PrivateRoute from "./PrivateRoute";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/sistema" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
