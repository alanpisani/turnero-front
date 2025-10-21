import type { UseFormRegisterReturn } from "react-hook-form";
// import type SignUpFormType from "./SignUpFormType";

// type SignUpFormKeys = keyof SignUpFormType;

export default interface signUpImputType{
    type: React.HTMLInputTypeAttribute;
    id: string;
    placeholder: string;
    required?: boolean;
    iconClassName?: string;
    register?: UseFormRegisterReturn;
    errorMessage?: string;
    name: string;
}