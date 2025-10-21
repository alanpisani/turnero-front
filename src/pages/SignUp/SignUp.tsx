import "./SignUp.css";

import { SignUpForm } from "../../components/SignUp/SignUpForm/SignUpForm";
import { Footer } from "../../components/Footer/Footer";

interface SignUpProps{
  title: string;
}

export function SignUp({ title }:SignUpProps){
    return (
        <div className="container">
            <main className="sign-up-main">
                <div className="registro-container">
                    <h2>{ title }</h2>
                    <h4><span className="red-asterisk">*</span> Indica que un campo es obligatorio</h4>
                    <SignUpForm />
                </div>
            </main>
            <Footer />
        </div>
    );
}