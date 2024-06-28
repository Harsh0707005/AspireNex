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

    async function checkAnswer() {
        await fetch(`http://localhost:3000/quiz/checkAnswer/${quizId}?question=${questionIndex}&answer=${selectedAnswer}`).then(res => res.json()).then(data => {
            if (data.correct) {
                localStorage.setItem(quizId, score + 1)
                setScore(score + 1)
            }
            if (questionIndex + 1 == totalQuestions) {
                console.log("finish", score)
            } else {
                setQuestionIndex(questionIndex + 1)
            }
        })
    }

    useEffect(() => {
        async function getQuestion() {
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
        <div className='flex flex-col items-center gap-[15px]'>
            <div className='w-fit flex flex-col mt-[2%]'>
                <div className="mb-1 text-base font-medium dark:text-black">{questionIndex + 1}/{totalQuestions}</div>
                <div className="w-[60vw] mobile:w-[90vw] bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-500">
                    <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: `${((questionIndex + 1) * 100) / totalQuestions}%` }}></div>
                </div>
            </div>
            <div className='w-[60vw]' dir='rtl'>
                <span className=''><b>Score: </b> {score}</span>
            </div>
            <span className='font-semibold text-xl'>Question {questionIndex + 1}</span>
            <span className='m-[20px]'>{question}</span>
            <div className='w-[60vw] flex flex-col gap-[25px] m-[10px]'>

                {options.map((option, index) => {
                    return (
                        <div key={index} className='flex flex-row gap-[15px] items-center'>
                            <input type="radio" name="option" value={index} onChange={(e) => setSelectedAnswer(index)} />
                            <label>{option}</label>
                        </div>
                    )
                })}
            </div>
            <button className='w-[100px] rounded-2xl bg-blue-500 p-[15px] hover:bg-blue-600 text-white font-semibold' onClick={checkAnswer}>Next</button>
        </div>
    )
}

export default Quiz