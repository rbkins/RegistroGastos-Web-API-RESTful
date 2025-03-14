import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";
import "./datatable.css";

interface Categoria {
  idcategoria: number;
  nombre: string;
}

interface Transaccion {
  idtrans: number;
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
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7274/api/transaccion", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  //codigo para obtener id de token
  const decodeJWT = (token: string) => {
    try {
      // Dividir el token en sus tres partes
      const [header, payload, signature] = token.split(".");

      // Decodificar el payload (parte del medio)
      const decodedPayload = atob(
        payload.replace(/-/g, "+").replace(/_/g, "/")
      );

      // Convertir el payload decodificado a un objeto JSON
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };

  const creartransaccion = async (
    monto: string,
    descripcion: string,
    idcategoria: number
  ) => {
    try {
      console.log();
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      const payload = decodeJWT(token);
      if (!payload) {
        throw new Error("No se pudo decodificar el token");
      }

      const idusuario =
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      if (!idusuario) {
        throw new Error("No se pudo extraer el IDUSUARIO del token");
      }

      const requestBody = {
        monto: parseFloat(monto),
        descripcion,
        idcategoria,
        idusuario: parseInt(idusuario, 10),
      };

      console.log("JSON enviado:", JSON.stringify(requestBody, null, 2));

      const response = await fetch("https://localhost:7274/api/transaccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
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

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const obtenercategoria = async () => {
    try {
      const token = localStorage.getItem("token");
      const responde = await fetch("https://localhost:7274/api/categoria", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!responde.ok) {
        throw new Error("Error al cargar categorias");
      }
      const data = await responde.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorias", Error);
    }
  };

  useEffect(() => {
    obtenercategoria();
  }, []);

  //eliminar transaccion
  const eliminartransaccion = async (idtrans: number) => {
    console.log("IDTRANS a eliminar:", idtrans);

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        console.log("Token:", token);
        const response = await fetch(
          `https://localhost:7274/api/transaccion/${idtrans}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Respuesta del servidor:", response); // Verifica la respuesta
        console.log("Estado de la respuesta:", response.status); // Verifica el estado
        console.log("Cuerpo de la respuesta:", await response.json()); // Verifica el cuerpo
        if (!response.ok) {
          throw new Error("Error al eliminar Transaccion");
        }
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Categoría eliminada correctamente.",
        });

        listartransaccion();
      } catch (error) {
        console.error("Error al eliminar transaccion:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la Transaccion.",
        });
      }
    }
  };

  //modal crear categoria:

  const abrirModalTransaccion = () => {
    const modalContent = `
      <input id="monto" class="swal2-input" placeholder="Monto" type="number">
      <input id="descripcion" class="swal2-input" placeholder="Descripción">
      <div class="tag-container">
        ${categorias
          .map(
            (categoria) =>
              `<div class="tag" data-id="${categoria.idcategoria}">${categoria.nombre}</div>`
          )
          .join("")}
      </div>
    `;

    Swal.fire({
      title: "Nueva Transacción",
      html: modalContent,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      didOpen: () => {
        const tags = document.querySelectorAll(".tag");
        let selectedCategoryId: number | null = null;

        tags.forEach((tag) => {
          tag.addEventListener("click", () => {
            tags.forEach((t) => t.classList.remove("selected"));

            tag.classList.add("selected");
            selectedCategoryId = parseInt(
              tag.getAttribute("data-id") || "",
              10
            );
          });
        });

        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.addEventListener("click", () => {
            const monto = (document.getElementById("monto") as HTMLInputElement)
              .value;
            const descripcion = (
              document.getElementById("descripcion") as HTMLInputElement
            ).value;

            if (!monto || !descripcion || !selectedCategoryId) {
              Swal.showValidationMessage(
                "Por favor, completa todos los campos"
              );
            } else {
              creartransaccion(monto, descripcion, selectedCategoryId);
            }
          });
        }
      },
    });
  };
  return (
    <div className="container mt-4 flex-grow-1">
      <h2>Transacciones</h2>
      <button
        onClick={abrirModalTransaccion}
        className="btn btn-sm btn-primary mb-3"
      >
        Nueva Transaccion
      </button>
      <table className="table table-striped table-bordered w-100">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Nombre Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaccion) => (
            <tr key={transaccion.idtrans}>
              <td>{transaccion.monto}</td>
              <td>{transaccion.descripcion}</td>
              <td>{transaccion.fecha.toLocaleString()}</td>
              <td>{transaccion.nombrE_CATEGORIA}</td>

              <td>
                <button className="btn btn-sm btn-primary me-2">Editar</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    console.log(
                      "Transacción seleccionada:",
                      transaccion.idtrans
                    ); // Verifica el objeto transaccion
                    eliminartransaccion(transaccion.idtrans);
                  }}
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
