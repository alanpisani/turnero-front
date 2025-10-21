import type signUpImputType from "../../../types/SignUp/SignUpImputType";
import "./FormImput.css";

export default function FormInput({ type, id, placeholder, required = false, iconClassName, register, errorMessage}: signUpImputType){
    return (
        <div className="form-group">
            <label htmlFor={ id }>
                { placeholder } { required && <span className="red-asterisk">*</span> }
            </label>
            
            <input 
                type={ type } 
                id={ id } 
                placeholder={ placeholder } 
                required={ required } 
                { ...register }/>

            { iconClassName && <i className={ iconClassName }></i> }

            {errorMessage && <p className="error-text">{errorMessage}</p>}
        </div>
    );
}