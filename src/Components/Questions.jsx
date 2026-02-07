import { useState } from "react"
import { nanoid } from "nanoid"

export default function Questions(props) {
    if (!props){
        return null
    }

    const [answers, setAnswers] = useState(() => {
        return [...props.incorrectAnswer, props.correctAnswer]
            .sort(() => Math.random() - 0.5)
            .map(ans => ({
                isSelected: false,
                id: nanoid(),
                value: ans,
                isCorrect: ans === props.correctAnswer
            }))
    })
    
    function selectAnswer(id){
        setAnswers(prev => {
            return prev.map(ans => ({
                ...ans,
                isSelected: ans.id === id
            }))
        })

        const selected = answers.find(ans => ans.id === id)
        props.onSelectAnswer(props.questionId, selected.isCorrect)
    } 
        

    return (
        <div className="bank">
            <h1 className="question">{props.question}</h1>
            <ul>
                {answers.map(ans => {
                    let bColor = "white"
                    
                    if (props.checked) {
                        if (ans.isSelected && !ans.isCorrect){
                            bColor = "red"
                        } else if (ans.isSelected && ans.isCorrect){
                            bColor = "green"
                        } else if (!ans.isSelected && ans.isCorrect){
                            bColor = "green"
                        } 
                    } else if (ans.isSelected){
                            bColor= "blue"
                    }
    

                    return (
                        <li key={ans.id}>
                            <button style={{backgroundColor: bColor}} onClick={() => selectAnswer(ans.id)}>
                                {ans.value}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
} 