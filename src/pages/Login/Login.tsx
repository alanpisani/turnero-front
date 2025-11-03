import { useForm } from "react-hook-form";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import BasicHeader from "../../components/shared/BasicHeader/BasicHeader";
import "./Login.css";
import { API_URL } from "../../config/apiConfig";
import { jwtDecode } from "jwt-decode";
import type { MyToken } from "../../types/Login/MyToken";
import { useNavigate } from "react-router-dom";

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormType>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        alert("Error de login: " + result["errors"]);
        return;
      }

      // Si el backend devuelve un token o datos del usuario

      localStorage.setItem("token", result.data);

      alert("Inicio de sesión exitoso!");

      const token = jwtDecode<MyToken>(result.data);

      if (token.rol == "Profesional") navigate("/panel/profesional");
      else if (token.rol == "Recepcionista") navigate("/panel/recepcionista");
      else if (token.rol == "Admin") navigate("/panel/admin");
      else navigate("/");
    } catch {
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <BasicHeader />

      <main>
        <section className="login-section">
          <h3 className="login-title">
            Agregá tu correo electrónico y tu contraseña para iniciar sesión
          </h3>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-input-container">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                placeholder="Ingresá tu correo electrónico"
                {...register("email", { required: true })}
                required
              />
            </div>
            <div className="login-form-input-container">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresá tu contraseña"
                {...register("password", { required: true })}
                required
              />
            </div>
            <ActionalBtn isTertiary={false} leyend="Ingresar" />
          </form>
        </section>
      </main>
    </>
  );
}
