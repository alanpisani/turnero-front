import "./Btn.css";

interface BtnProps{
    label: string;
    onClick?: ()=>void;
}

export function Btn({ label, onClick }: BtnProps){
    return <button className="btn" onClick={ onClick }>
        { label }
    </button>
}