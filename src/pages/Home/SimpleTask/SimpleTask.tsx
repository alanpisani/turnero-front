import type SimpleTaskType from "../../../types/Home/SimpleTaskType";
import "./SimpleTask.css";

export function SimpleTask({ title, img }: SimpleTaskType){
    return (
        <div className="simple-task">
            <div className="task-icon-container">
                <img src={img} alt="" />
            </div>
            <p>{ title }</p>
        </div>
    );
}