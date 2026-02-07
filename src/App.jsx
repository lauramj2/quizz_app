import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import he from "he"

import blobYellow from "./Assets/blob-yellow.png"
import blobPurple from "./Assets/blob-purple.png"

import Questions from "./Components/Questions.jsx"


export default function App() {

  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState({})
  const [checked, setChecked] = useState(false)
  const [scoreMsg, setScoreMsg] = useState("")

  const fetchedRef = useRef(false) // track if fetch already happened

  async function getQuestions() {
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
      // console.log("HTTP status:", res.status)
      // console.log("ok?", res.ok)

      if (Array.isArray(data.results)){
        const questionsWithId = data.results.map(question => ({
          ...question,
          id: nanoid(),
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(ans => he.decode(ans))
        }))
        setQuestions(questionsWithId)
      } else {
        setQuestions([])
      }
    } catch(err) {
      console.error("Failed to fetch", err)
      setQuestions([])
    }
  }

  useEffect(() => {
    if (fetchedRef.current) {
        return
      } // prevent duplicate fetch
    fetchedRef.current = true
    
    getQuestions()
  }, [])


  function handleSelect(questionId, isCorrect){
    setResults(prev => ({
      ...prev,
      [questionId]: isCorrect

      //ex: questionId: "q3", isCorrect: true becomes ===> q3: true
      //square brackets = use value of the variable as the key
      //marks every questions either true or false
      //updates every time something is selected, updates if answer was changed etc
    }))
  }

  function checkAnswers(){
    if (Object.values(results).length !== questions.length){
      alert("Please answer all questions")
      return
    }

    setChecked(true)
    //mark that answers were checked
  
    const values = Object.values(results)
    //Object.values(results) turns object into array of values
    const correctAnswers = values.filter(value => value === true)
    //filter keeps only true values
    const score = correctAnswers.length

    setScoreMsg(`You scored ${score} / ${questions.length} correct answers`)
 
  }

  function newGame(){
    setChecked(false)
    setResults({})
    setScoreMsg("")
    getQuestions()
  }



  const questionElements = questions.map(question => {
    return (
        <Questions
          key={question.id}
          questionId={question.id}
          question={question.question}
          correctAnswer={question.correct_answer}
          incorrectAnswer={question.incorrect_answers}
          onSelectAnswer={handleSelect}
          checked={checked}
          selectedResult={results[question.id]}
        />
    )
  })


  return (
    <main>
      <div class="card">
        <img src={blobYellow} alt="blob" className="blob blobYellow" />
        <img src={blobPurple} alt="blob" className="blob blobPurple" />

        {(!Array.isArray(questions) || questions.length === 0) ? 
            (
              <p>Loading Questions...</p>
            ):
            (
              questionElements
            )
          }
          {checked === false && <div className="checkDiv">
            <button className="checkBtn" onClick={checkAnswers}>Check Answers</button>
          </div>}

          {checked === true && <div className="newGameDiv">
            <p>{scoreMsg}</p>
            <button className="newBtn" onClick={newGame}>Play Again</button>
          </div>}
      </div>
    </main>
  )
}
