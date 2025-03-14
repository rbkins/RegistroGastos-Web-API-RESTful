import React, { useEffect, useState, useRef } from "react";
import $ from "jquery"; // Importa jQuery
import "datatables.net"; // Importa DataTables
import "datatables.net-bs5"; // Importa DataTables con Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // Importa los estilos de DataTables para Bootstrap 5
import Swal from "sweetalert2"; // Importa SweetAlert2
import "./datatable.css"; // Archivo CSS con los estilos

interface Categoria {
  idcategoria: number;
  nombre: string;
  tipo: string;
}

export const Categoria: React.FC = () => {
  const [data, setData] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Función para obtener los datos de la API
  const listarcategoria = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7274/api/categoria", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Error al cargar datos");
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar datos");
      setLoading(false);
    }
  };

  // Función para enviar los datos de la nueva categoría
  const crearCategoria = async (nombre: string, tipo: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://localhost:7274/api/categoria/Nuevo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombre, tipo }), // Envía los datos en formato JSON
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la categoría");
      }

      // Muestra una alerta de éxito
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Categoría creada correctamente.",
      });

      // Recarga los datos
      listarcategoria();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      // Muestra una alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la categoría.",
      });
    }
  };

  const handleDelete = async (IDCATEGORIA: number) => {
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
        const response = await fetch(
          `https://localhost:7274/api/categoria/${IDCATEGORIA}`,

          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al Eliminar la categoria");
        }

        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Categoría eliminada correctamente.",
        });

        listarcategoria();
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        // Muestra una alerta de error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la categoría.",
        });
      }
    }
  };

  // Función para editar una categoría
  const handleEdit = async (categoria: Categoria) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar Categoría",
      html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" value="${categoria.nombre}">
          <input id="tipo" class="swal2-input" placeholder="Tipo" value="${categoria.tipo}">
        `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (document.getElementById("nombre") as HTMLInputElement)
          .value;
        const tipo = (document.getElementById("tipo") as HTMLInputElement)
          .value;
        if (!nombre || !tipo) {
          Swal.showValidationMessage("Por favor, completa todos los campos");
        }
        return { nombre, tipo };
      },
    });

    if (formValues) {
      try {
        const response = await fetch(
          `https://localhost:7274/api/categoria/editar/${categoria.idcategoria}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: formValues.nombre,
              tipo: formValues.tipo,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al editar la categoría");
        }

        // Muestra una alerta de éxito
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Categoría editada correctamente.",
        });

        // Recarga los datos
        listarcategoria();
      } catch (error) {
        console.error("Error al editar la categoría:", error);
        // Muestra una alerta de error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo editar la categoría.",
        });
      }
    }
  };

  // Función para abrir el modal de SweetAlert2
  const abrirModalNuevaCategoria = () => {
    Swal.fire({
      title: "Nueva Categoría",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <input id="tipo" class="swal2-input" placeholder="Tipo">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (document.getElementById("nombre") as HTMLInputElement)
          .value;
        const tipo = (document.getElementById("tipo") as HTMLInputElement)
          .value;
        if (!nombre || !tipo) {
          Swal.showValidationMessage("Por favor, completa todos los campos");
        }
        return { nombre, tipo };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        crearCategoria(result.value.nombre, result.value.tipo);
      }
    });
  };

  useEffect(() => {
    listarcategoria();
  }, []);

  // Inicializar DataTables cuando los datos estén listos
  useEffect(() => {
    if (!loading && tableRef.current) {
      $(tableRef.current).DataTable({
        paging: true, // Habilita la paginación
        searching: true, // Habilita la barra de búsqueda
        ordering: true, // Habilita el ordenamiento
        info: true, // Muestra información de paginación
        lengthMenu: [5, 10, 25, 50], // Opciones de cantidad de filas por página
        pageLength: 10, // Cantidad de filas por página por defecto
        language: {
          search: "Buscar:", // Personaliza el texto de búsqueda
          paginate: {
            previous: "Anterior",
            next: "Siguiente",
          },
          lengthMenu: "Mostrar _MENU_ entradas", // Personaliza el texto de lengthMenu
          info: "Mostrando _START_ a _END_ de _TOTAL_ entradas", // Personaliza el texto de info
        },
      });
    }
  }, [loading]);

  // Renderizado condicional
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4 flex-grow-1">
      <h2>Categorías</h2>
      <button
        className="btn btn-sm btn-primary mb-3"
        onClick={abrirModalNuevaCategoria} // Abre el modal de SweetAlert2
      >
        Nueva Categoría
      </button>
      <table
        ref={tableRef}
        className="table table-striped table-bordered w-100"
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((categoria) => (
            <tr key={categoria.idcategoria}>
              <td>{categoria.nombre}</td>
              <td>{categoria.tipo}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(categoria)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(categoria.idcategoria)}
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
