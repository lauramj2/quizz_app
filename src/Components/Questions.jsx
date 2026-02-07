import { useState } from "react"
import { nanoid } from "nanoid"
import { clsx } from "clsx"

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
                    const buttonClass = clsx("button", {
                        "button-default": !ans.isSelected,
                        "button-selected": ans.isSelected && !props.checked,
                        "button-correct": props.checked && ans.isCorrect,
                        "button-wrong": props.checked && ans.isSelected && !ans.isCorrect,
                        "button-checked": props.checked && !ans.isCorrect
                    })

                    return (
                        <li key={ans.id}>
                            <button className={buttonClass} onClick={() => selectAnswer(ans.id)} disabled={props.checked}>
                                {ans.value}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
} 

//  {/* {answers.map(ans => {
//                     let bColor = "white"
                    
//                     if (props.checked) {
//                         if (ans.isSelected && !ans.isCorrect){
//                             bColor = "red"
//                         } else if (ans.isSelected && ans.isCorrect){
//                             bColor = "green"
//                         } else if (!ans.isSelected && ans.isCorrect){
//                             bColor = "green"
//                         } 
//                     } else if (ans.isSelected){
//                             bColor= "blue"
//                     } */}