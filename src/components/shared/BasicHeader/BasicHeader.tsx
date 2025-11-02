import Logo from "../../Logo/Logo";

export default function BasicHeader(){
    return (
        <header style={{ display: "flex" }}>
            <Logo title="Clínica" subtitle="De verdad"/>
        </header>
    );
}