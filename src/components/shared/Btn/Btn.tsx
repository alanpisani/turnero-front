import "./Btn.css";

interface BtnProps{
    label: string; 
}

export function Btn({ label }: BtnProps){
    return <button className="btn" >
        { label }
    </button>
}