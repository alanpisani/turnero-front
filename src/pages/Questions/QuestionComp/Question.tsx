import "./Question.css"

interface QuestionProps{
    question: string;
    answer: string;
}

export default function Question({ question, answer }: QuestionProps){
    return(
        <div className="question-container">
            <p className="question">{question}</p>
            <p className="answer">{answer}</p>
        </div>
    );
}