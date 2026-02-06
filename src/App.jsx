import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"

import Questions from "./Components/Questions.jsx"

export default function App() {

  const [questions, setQuestions] = useState([])
  const fetchedRef = useRef(false) // track if fetch already happened

  useEffect(() => {
    if (fetchedRef.current) {
        return
      } // prevent duplicate fetch
    fetchedRef.current = true

    async function getQuestions() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10")

        console.log("HTTP status:", res.status)
        console.log("ok?", res.ok)

        const data = await res.json()

        if (Array.isArray(data.results)){
          console.log(data.results)
          setQuestions(data.results)
        } else {
          setQuestions([])
        }
      } catch(err) {
        console.error("Failed to fetch", err)
        setQuestions([])
      }
    }

    getQuestions()

  }, [])

  const questionElements = questions.map((question) => {
    return (
        <Questions
          key={question.question}
          question={question.question}
          correctAnswer={question.correct_answer}
          incorrectAnswer={question.incorrect_answers}
        />
    )
  })

  return (
    <>
      <h1>Test</h1>
      {(!Array.isArray(questions) || questions.length === 0) ? 
        (
          <p>Loading Questions</p>
        ):
        (
          questionElements
        )
      }
    </>
  )
}
