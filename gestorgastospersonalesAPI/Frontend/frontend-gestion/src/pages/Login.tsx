import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./login.css";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string; // Cambiado a "password" para mayor claridad
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Datos del formulario:", data);

      const response = await fetch("https://localhost:7274/api/acceso/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          passworDdHASH: data.password, // Envía la contraseña en texto plano
        }),
      });

      // Manejar la respuesta del backend
      if (!response.ok) {
        const errorData = await response.json(); // Captura el mensaje de error del backend
        throw new Error(errorData.message || "Credenciales incorrectas");
      }

      const result = await response.json();

      // Guardar el token en localStorage
      localStorage.setItem("token", result.token);

      // Mostrar mensaje de éxito
      Swal.fire("Éxito", "Inicio de sesión correcto", "success");

      // Redirigir al dashboard
      navigate("/sistema");
    } catch (error) {
      // Mostrar mensaje de error
      Swal.fire("Credenciales incorrectas", "error");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-7 col-xl-7">
            <img
              src="https://img.freepik.com/vector-premium/tipo-sonriente-dibujos-animados-cuenta-dinero-calculadora-personas-que-planifican-presupuesto-proceso-analisis-presupuesto-personal-o-corporativo-contabilidad-calculo-ingresos-financieros_776652-3626.jpg"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-9 col-lg-8 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className={`form-control form-control-lg ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter a valid email address"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "El email no es válido",
                    },
                  })}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className={`form-control form-control-lg ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 1,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  No tienes cuenta?{" "}
                  <a href="#!" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
