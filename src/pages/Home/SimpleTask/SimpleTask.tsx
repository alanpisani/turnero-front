import type SimpleTaskType from "../../../types/Home/SimpleTaskType";
import "./SimpleTask.css";

export function SimpleTask({ title }: SimpleTaskType){
    return (
        <div className="simple-task">
            <div className="task-icon-container"></div>
            <p>{ title }</p>
        </div>
    );
}