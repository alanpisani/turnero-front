import { useForm } from "react-hook-form";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import BasicHeader from "../../components/shared/BasicHeader/BasicHeader";
import "./Login.css"

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login(){
    const { register, handleSubmit } = useForm<LoginFormType>();

    const onSubmit = async (data: LoginFormType) => {
        try {
            const response = await fetch("http://localhost:5295/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Error de login: " + (errorData["errors"] || "Credenciales inválidas"));
                return;
            }

            // Si el backend devuelve un token o datos del usuario
            const result = await response.json();
            localStorage.setItem("token", result.token);

            alert("Inicio de sesión exitoso!");
            // redirigir si querés
            window.location.href = "/";
        } catch {
        
            alert("No se pudo conectar con el servidor");
        }
    };

    return (
        <>
            <BasicHeader />
                
            <main>
                <section className="login-section">
                    <h3 className="login-title">Agregá tu correo electrónico y tu contraseña para iniciar sesión</h3>
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-form-input-container">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" placeholder="Ingresá tu correo electrónico" {...register("email", { required: true })} required/>
                        </div>
                        <div className="login-form-input-container">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" placeholder="Ingresá tu contraseña" {...register("password", { required: true })} required/>
                        </div>
                        <ActionalBtn isTertiary={ false } leyend="Ingresar"/>
                    </form>
                </section>
            </main>
            
        </>

    );
}