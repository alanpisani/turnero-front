import "./Select.css";

interface SelectProps{
    options: string[];
    name: string;
    id?: string;
}

export default function Select({ options, name, id }: SelectProps){
    return (
        <div className="form-group">
            <label htmlFor="social">Selecciona un Obra Social</label>
            <select name={ name } id={ id ?? "" } >
                {
                    options.map( (option, index) => (
                        <option key={index} value={ option }>{ option }</option>
                    ))
                }
            </select>
        </div>
    );
}