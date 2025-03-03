import { ChangeEvent, useState } from "react";
import { appsettings } from "../settings/settings";
import { useNavigate } from "react-router-dom";
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
  NOMBRE: "",
  TIPO: "",
};

export function Nuevacategoria() {
  const [categoria, setCategoria] = useState<IDCATEGORIA>(initialCategoria);
  const navigate = useNavigate();

  //actualizar propiedades empleado
  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name; //valor caja de texto
    const inputValue = event.target.value; //valor

    setCategoria({ ...categoria, [inputName]: inputValue });
  };
  //enviar informacion API
  const guardar = async () => {
    const response = await fetch(`${appsettings.apiURL}categoria/Nuevo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });
    if (response.ok) {
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo Guardar el Empleado",
      });
    }
  };

  //metodo volver
  const volver = () => {
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Nueva Categoria</h4>
          <hr />

          <Form>
            <FormGroup>
              <Label>Nombre Categoria</Label>
              <Input
                type="text"
                name="NOMBRE"
                onChange={inputChangeValue}
                value={categoria.NOMBRE}
              />

              <Label>Tipo Categoria</Label>
              <Input
                type="text"
                name="TIPO"
                onChange={inputChangeValue}
                value={categoria.TIPO}
              />
            </FormGroup>
          </Form>
          <Button color="primary" className="me-4" onClick={guardar}>
            Guardar
          </Button>
          <Button color="secondary" className="me-4" onClick={volver}>
            Regresar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
