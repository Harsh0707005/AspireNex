import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Quiz = () => {
    const { quizId } = useParams()
    const [question, setQuestion] = useState()
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [questionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)

    async function checkAnswer(){
        await fetch(`http://localhost:3000/quiz/checkAnswer/${quizId}?question=${questionIndex}&answer=${selectedAnswer}`).then(res => res.json()).then(data => {
            if (data){
                setScore(score + 1)
                setQuestionIndex(questionIndex + 1)
            }
        })
    }

    useEffect(() => {
        async function getQuestion(){
            document.getElementsByName('option').forEach(radio => radio.checked = false)
            await fetch(`http://localhost:3000/quiz/${quizId}?questionIndex=${questionIndex}`).then(res => res.json()).then(data => {
                setQuestion(data.question)
                setOptions(data.options)
                setTotalQuestions(data.totalQuestions)
            })
        }

        getQuestion();
    }, [questionIndex])

    return (
        <div>
            <h2>Q{questionIndex + 1}. {question}</h2>
            {options.map((option, index) => {
                return (
                    <div key={index}>
                        <input type="radio" name="option" value={index} onChange={(e) => setSelectedAnswer(index)} />
                        <label>{option}</label>
                    </div>
                )
            })}
            <button onClick={checkAnswer}>Next</button>
        </div>
    )
}

export default Quiz