import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
    EmailShareButton,
    FacebookShareButton, LineShareButton,
    LinkedinShareButton, PinterestShareButton, RedditShareButton,
    TelegramShareButton, TumblrShareButton,
    TwitterShareButton, WhatsappShareButton
} from 'react-share'

const Quiz = () => {
    const { quizId } = useParams()
    const [question, setQuestion] = useState()
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [questionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [quizFinished, setQuizFinished] = useState(false)

    async function checkAnswer() {
        await fetch(`http://localhost:3000/quiz/checkAnswer/${quizId}?question=${questionIndex}&answer=${selectedAnswer}`).then(res => res.json()).then(data => {
            if (data.correct & score < totalQuestions) {
                localStorage.setItem(quizId, score + 1)
                setScore(score + 1)
            }else{
                localStorage.setItem(quizId, score)
            }
            if (questionIndex + 1 == totalQuestions) {
                setQuizFinished(true)
            } else {
                setQuestionIndex(questionIndex + 1)
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem(quizId)){

            setScore(parseInt(localStorage.getItem(quizId)))
            setQuizFinished(true)
        }else{
            setScore(0)
        }
    }, [])

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

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        document.body.appendChild(script);
    }, [])

    const shareButtonShow = (e) => {
        e.target.insertAdjacentHTML('afterend', "<ShareSocial title={'Quiz Created Successfully!!! Share on Social Platforms'} style='width:500px;height:500px;' url='fdsf.com' socialTypes={['facebook', 'whatsapp', 'twitter', 'reddit', 'linkedin', 'telegram', 'line']} />")
    }

    const retakeButton = () => {
        localStorage.removeItem(quizId)
        setScore(0)
        setQuizFinished(0)
    }

    return (
        <div className='flex flex-col items-center gap-[15px]'>
            {
                quizFinished ? (
                    <div className='flex flex-row items-center justify-center w-[100vw] h-[100vh] bg-green-400 gap-[10px]'>
                        <lottie-player src="https://lottie.host/f61b4eea-5712-42c3-ab5a-79387cfec522/4CFG4nJJoq.json" background="##FFFFFF" speed="0.5" style={{ width: 200, height: 200, zIndex: 2 }} loop autoplay direction="1" mode="normal"></lottie-player>
                        <div className='flex flex-col bg-white border border-black rounded-xl p-[20px] gap-[20px] z-[2]'>
                            <span className='font-semibold text-xl'>Congratulations on completing the Quiz!!!</span>
                            <div className='flex flex-col bg-golden rounded-xl p-[10px] gap-[10px]'>
                                <span className='font-semibold'>Your Score</span>
                                <span className='font-bold text-2xl'>{score}/{totalQuestions}</span>
                                <button className='rounded-2xl bg-blue-500 p-[15px] hover:bg-blue-600 text-white font-semibold mt-[10px]' onClick={retakeButton}>Retake Quiz</button>
                                <button className='rounded-2xl bg-orange-500 p-[15px] hover:bg-orange-600 text-white font-semibold' onClick={shareButtonShow}>Share Your Score</button>
                            </div>
                        </div>
                        <lottie-player src="https://lottie.host/f61b4eea-5712-42c3-ab5a-79387cfec522/4CFG4nJJoq.json" background="##FFFFFF" speed="0.5" style={{ width: 200, height: 200, zIndex: 1, transform: "scaleX(-1)", zIndex: 2 }} loop autoplay direction="0" mode="normal"></lottie-player>

                        {/* Firecrackers */}
                        <lottie-player src="https://lottie.host/2ef7c797-194b-45d6-9aa8-ea84c43a3ff9/JLM5qM0nEm.json" background="##FFFFFF" speed="0.5" style={{ width: 900, height: 950, position: 'absolute', zIndex: 1 }} loop autoplay direction="1" mode="normal">
                        </lottie-player>


                    </div>)
                    :
                    (
                        <>
                            <div className='w-fit flex flex-col mt-[2%]'>
                                <div className="mb-1 text-base font-medium dark:text-black">{questionIndex + 1}/{totalQuestions}</div>
                                <div className="w-[60vw] mobile:w-[90vw] bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-500">
                                    <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: `${((questionIndex + 1) * 100) / totalQuestions}%` }}></div>
                                </div>
                            </div>
                            <div className='w-[60vw]' dir='rtl'>
                                <span><b>Score: </b> {score}</span>
                            </div>
                            <span className='font-semibold text-xl'>Question {questionIndex + 1}</span>
                            <span className='m-[20px]'>{question}</span>
                            <div className='w-[60vw] flex flex-col gap-[25px] m-[10px]'>

                                {options.map((option, index) => {
                                    return (
                                        <div key={index} className='flex flex-row gap-[15px] items-center'>
                                            <input id={index} type="radio" name="option" value={index} onChange={(e) => setSelectedAnswer(index)} />
                                            <label htmlFor={index}>{option}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='w-[60vw] mobile:w-[90vw]' dir='rtl'>
                                <button className='w-[100px] rounded-2xl bg-blue-500 p-[15px] hover:bg-blue-600 text-white font-semibold' onClick={checkAnswer}>Next</button>
                            </div>
                        </>)
            }
        </div>
    )
}

export default Quiz