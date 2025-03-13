import React, { useEffect, useState, useRef } from "react";
import $ from "jquery"; // Importa jQuery
import "datatables.net"; // Importa DataTables
import "datatables.net-bs5"; // Importa DataTables con Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // Importa los estilos de DataTables para Bootstrap 5
import Swal from "sweetalert2"; // Importa SweetAlert2
import "./datatable.css"; // Archivo CSS con los estilos

interface Transaccion {
  IDTRANS: number;
  monto: number;
  descripcion: string;
  fecha: Date;
  idusuario: number;
  idcategoria: number;
  nombrE_USUARIO: string;
  nombrE_CATEGORIA: string;
}

export const Transaccion: React.FC = () => {
  const [data, setData] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const tableref = useRef<HTMLTableElement>(null);

  const listartransaccion = async () => {
    try {
      const response = await fetch("https://localhost:7274/api/transaccion");
      if (!response.ok) {
        throw new Error("Error al cargar Datos");
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar datos");
      setLoading(false);
    }
  };

  useEffect(() => {
    listartransaccion();
  }, []);

  const creartransaccion = async (
    monto: string,
    descripcion: string,
    idusuario: number,
    idcategoria: number
  ) => {
    try {
      const response = await fetch("https://localhost:7274/api/transaccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monto, descripcion, idusuario, idcategoria }),
      });

      if (!response.ok) {
        throw new Error("Error al crear transaccion");
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Categoría creada correctamente.",
      });

      listartransaccion();
    } catch (error) {
      console.error("Error al crear Transaccion", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la Transaccion.",
      });
    }
  };

  return (
    <div className="container mt-4 flex-grow-1">
      <h2>Categorías</h2>
      <button
        className="btn btn-sm btn-primary mb-3"
        //  onClick={abrirModalNuevaCategoria} // Abre el modal de SweetAlert2
      >
        Nueva Categoría
      </button>
      <table
        // ref={tableRef}
        className="table table-striped table-bordered w-100"
      >
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Nombre Usuario</th>
            <th>Nombre Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaccion) => (
            <tr key={transaccion.IDTRANS}>
              <td>{transaccion.monto}</td>
              <td>{transaccion.descripcion}</td>
              <td>{transaccion.fecha.toLocaleString()}</td>
              <td>{transaccion.nombrE_USUARIO}</td>
              <td>{transaccion.nombrE_CATEGORIA}</td>

              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  //    onClick={() => handleEdit(categoria)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  //     onClick={() => handleDelete(categoria.idcategoria)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
