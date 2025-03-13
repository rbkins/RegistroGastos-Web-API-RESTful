// src/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/sistema";
import NotFound from "./pages/Notfound";
import PrivateRoute from "./PrivateRoute";
import { Categoria } from "./pages/categoria"; // Importación nombrada
import { Transaccion } from "./pages/transaccion";
import Menu from "./pages/menu";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública (sin Menu) */}
        <Route path="/Login" element={<Login />} />

        {/* Rutas privadas (con Menu) */}
        <Route element={<PrivateRoute />}>
          <Route element={<Menu />}>
            {" "}
            {/* Envuelve las rutas con Menu */}
            <Route path="/sistema" element={<Dashboard />} />
            <Route path="/categoria" element={<Categoria />} />
            <Route path="/transaccion" element={<Transaccion />} />
          </Route>
        </Route>

        {/* Ruta por defecto */}
        <Route path="/" element={<Login />} />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
