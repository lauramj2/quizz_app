

export default function Questions(props) {
    if (!props){
        return null
    }
    const allAnswers = [...props.incorrectAnswer, props.correctAnswer]
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)
    const correct = props.correctAnswer
    
    return (
        <div className="bank">
            <h1 className="question">{props.question}</h1>
            <ul>
                {[...props.incorrectAnswer, props.correctAnswer]
                .sort(() => Math.random() - 0.5)
                .map((ans, index) => (
                <li key={index}><button>{ans}</button></li>
                ))}
            </ul>
        </div>
    )
}