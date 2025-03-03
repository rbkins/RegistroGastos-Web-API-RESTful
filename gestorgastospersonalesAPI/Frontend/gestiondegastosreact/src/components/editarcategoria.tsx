import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../settings/settings";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IDCATEGORIA } from "../Interfaces/IDCATEGORIA";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const initialCategoria = {
  IDCATEGORIA: 0,
  NOMBRE: "",
  TIPO: "",
};

export function Editarcategoria() {
  //hook
  const { id } = useParams<{ id: string }>();
  const [categoria, setCategoria] = useState<IDCATEGORIA>(initialCategoria);
  const navigate = useNavigate();

  //hook para poder ejecutar una funciona cuando se renderice el componente
  useEffect();

  return <h1>editar categoria</h1>;
}
