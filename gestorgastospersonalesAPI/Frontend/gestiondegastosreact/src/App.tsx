import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Listarcategoria } from "./components/categorialistar";
import { Nuevacategoria } from "./components/nuevacategoria";
import { Editarcategoria } from "./components/editarcategoria";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listarcategoria />} />
        <Route path="nuevacategoria" element={<Nuevacategoria />} />
        <Route path="editarcategoria/:id" element={<Editarcategoria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
