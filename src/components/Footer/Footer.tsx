import "./Footer.css"

export function Footer(){
    const fullYear: number = new Date().getFullYear();

    return (
        <footer>
            <p id="footer-text">© {fullYear} Clínica de mentira. Todos los derechos reservados.</p>
        </footer>
    );
}