import { useForm } from "react-hook-form";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import BasicHeader from "../../components/shared/BasicHeader/BasicHeader";
import "./Login.css";
import { API_URL } from "../../config/apiConfig";
import { jwtDecode } from "jwt-decode";
import type { MyToken } from "../../types/Login/MyToken";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormType>();
  const navigate = useNavigate();
  const [disable, setDisable] = useState<boolean>(false);
  
  const[emailError, setEmailError] = useState<string>("");
  const[passwordError, setPasswordError] = useState<string>("");

  const onSubmit = async (data: LoginFormType) => {
    try {
      setDisable(true);
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        setDisable(false);
        if(result.errors){
          setEmailError(result.errors.Email ? result.errors.Email : "");
          setPasswordError(result.errors.password ? result.errors.password : "");
        }
        return;
      }

      // Si el backend devuelve un token o datos del usuario

      localStorage.setItem("token", result.data);

      const token = jwtDecode<MyToken>(result.data);

      if (token.rol != "Paciente") navigate(`/panel/${token.rol.toLowerCase()}`);
      else navigate("/");
      
    } catch {
      alert("No se pudo conectar con el servidor");
      setDisable(false);
    }
  };

  return (
    <>
      <BasicHeader />

      <main>
        <section className="login-section">
          <h3 className="login-title">
            Ingresá tu correo electrónico y tu contraseña para iniciar sesión
          </h3>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-input-container">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingresá tu correo electrónico"
                {...register("email", { required: true })}
                required
              />
              <p className="error-input">{ emailError }</p>
            </div>
            <div className="login-form-input-container">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresá tu contraseña"
                {...register("password", { required: true })}
                required
              />
              <p className="error-input">{ passwordError }</p>
            </div>
            <ActionalBtn isDisabled={disable}  leyend="Ingresar" />
          </form>
        </section>
      </main>
    </>
  );
}
