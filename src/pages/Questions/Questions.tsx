import { Footer } from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ActionalBtn from "../../components/shared/ActionalBtn/ActionalBtn";
import { questionData } from "../../data/questionsData";
import Question from "./QuestionComp/Question";
import "./Questions.css"

export default function Questions(){
    return (
        <>
            <Header/>
            <main>
                <section className="questions-section mt-10">
                    <div className="questions-big-container">
                        <div className="questions-title-container">
                            <h2>Preguntas frecuentes</h2>
                            <ActionalBtn linkTo="/" leyend="Volver" isTertiary />
                        </div>
                        <div className="questions-container">
                            {
                                questionData.map(( question, index )=>(
                                    <Question key={index}  question={question.question} answer={question.answer} />
                                ))
                            }
                            
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}