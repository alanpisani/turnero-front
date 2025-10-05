import "./SimpleTask.css";

interface SimpleTaskProps{
    title: string;
}

export function SimpleTask({ title }: SimpleTaskProps){
    return (
        <div className="simple-task">
            <div className="task-icon-container"></div>
            <p>{ title }</p>
        </div>
    );
}