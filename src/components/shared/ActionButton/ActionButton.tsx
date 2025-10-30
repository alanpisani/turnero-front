import "./ActionButton.css";

interface ActionButtonProps{
    leyend: string;
    isCancelButton?: boolean
}

export default function ActionButton({ leyend, isCancelButton }: ActionButtonProps){
    return(
        <button className={"action-button " + (isCancelButton ? "cancel-button" : "normal-action-button")}>{leyend}</button>
    );
}