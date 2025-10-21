import type signUpImputType from "../types/SignUp/SignUpImputType";

interface signUpInputsSectionType{
    input_section: string;
    inputs: signUpImputType[]
}

export const signUpInputData: signUpInputsSectionType[] = [
    {
        input_section: "Datos personales",
        inputs: [
            {
                type: "text",
                id: "nombre",
                name: "nombre",
                placeholder: "Ingrese su nombre",
                required: true,
                iconClassName: "bi bi-person ubication-icon"
            },
            {
                type: "text",
                id: "apellido",
                name: "apellido",
                placeholder: "Ingrese su apellido",
                required: true,
                iconClassName: "bi bi-person ubication-icon"
            },
            {
                type: "number",
                id: "dni",
                name: "dni",
                placeholder: "Ingrese su número de documento",
                required: true,
                iconClassName: "bi bi-person-vcard ubication-icon"
            },
            {
                type: "date",
                id: "fecha-nac",
                name: "fechanacimiento",
                placeholder: "Ingrese su fecha de nacimiento",
                required: true,
            },
        ]
    },
    {
        input_section: "Datos de autenticación",
        inputs: [
            {
                type: "email",
                id: "email",
                name: "email",
                placeholder: "Ingrese su correo electrónico",
                required: true,
                iconClassName: "bi bi-envelope-at ubication-icon"
            },

            {
                type: "tel",
                id: "telefono",
                name: "telefono",
                placeholder: "Ingrese su número de teléfono",
                required: true,
                iconClassName: "bi bi-telephone ubication-icon"
            },
            {
                type: "password",
                id: "password",
                name: "contrasenia",
                placeholder: "Ingrese contraseña",
                required: true,
                iconClassName: "toggle-password ubication-icon"
            },
            {
                type: "password",
                id: "password-2",
                name: "contraseniarepetida",
                placeholder: "Vuelva a ingresar la contraseña",
                required: true,
                iconClassName: "toggle-password ubication-icon"
            },
        ]
    }

];