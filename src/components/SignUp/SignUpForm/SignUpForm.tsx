import { useForm } from "react-hook-form";
import { signUpInputData } from "../../../data/SignUpFormData";
import FormInput from "../../shared/FormImput/FormImput";
import Select from "../../shared/Select/Select";
import { signUpSelectData } from "../../../data/SignUpSelectData";
import { Btn } from "../../shared/Btn/Btn";
import "./SignUpForm.css"
import type SignUpFormType from "../../../types/SignUp/SignUpFormType";

export function SignUpForm() {
  
  const { register, handleSubmit, setError, reset, clearErrors, formState: { errors }, } = useForm<SignUpFormType>();

const onSubmit = async (data: SignUpFormType) => {
  try {
    clearErrors();

    const response = await fetch("http://localhost:5295/api/paciente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          
          if (field.toLowerCase() in data) {

            setError(field.toLowerCase() as keyof SignUpFormType, {
              type: "server",
              message: (messages as string[])[0],
            });
          } else {
            console.warn(`Campo desconocido: ${field}`);
          }
        });
      }
      return;
    }

    alert("Registro completado con éxito!");

    reset();
  } catch (error) {
    console.error("⚠️ Error en el fetch:", error);
    alert("Hubo un problema al conectar con el servidor.");
  }
};

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      { signUpInputData.map((inputSection, index)=>(
        <div key={index} className="input-section">
          <blockquote> 
            <h4 className="input-section-title">{ inputSection.input_section }</h4> 
          </blockquote>

          { inputSection.inputs.map((input, index) => ( 
            <FormInput 
              key={ index } 
              type={ input.type } 
              id={ input.id } 
              name={ input.name } 
              placeholder={ input.placeholder } 
              required= { input.required } 
              iconClassName={ input.iconClassName } 
              register={ register(input.name as keyof SignUpFormType) }
              errorMessage={errors[input.name as keyof SignUpFormType]?.message?.toString()}
            /> )) }
        </div>
        
      )) }

      <Select options={signUpSelectData} name="social" id="social"/> 
      <Btn label="Registrate" /> 
        <div className="login-link"> <p>¿Ya tenés cuenta? 
          <a href="login.html" className="login-text">¡Iniciá sesión acá!</a></p> 
        </div>
    </form>
  );
}
