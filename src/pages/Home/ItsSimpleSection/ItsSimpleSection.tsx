import { simpleTasksData } from "../../../data/simpleTasksData";
import { SimpleTask } from "../SimpleTask/SimpleTask";
import "./ItsSimpleSection.css";

interface ItsSimpleSectionProps{
    title: string;
}

export function ItsSimpleSection( { title }: ItsSimpleSectionProps ){
    return (
        <section id="its-simple" className="es-simple-section">
            <div className="section-content">
                <h2>{ title }</h2>
                <div className="es-simple-container">
                    {
                        simpleTasksData.map( (task, index) => (
                            <SimpleTask key={index} title={task.title} />
                        ) )
                    }
                </div>
            </div>
        </section>
    );
}