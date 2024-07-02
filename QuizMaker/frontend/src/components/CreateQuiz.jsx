import React, { useEffect, useState } from 'react'
import { ShareSocial } from 'react-share-social'
import LoadingAnimation from './LoadingAnimation'

const CreateQuiz = () => {
    const [questions, setQuestions] = useState([{ title: 'rj', options: ['abc', 'cds', '', ''], answer: -1 }])
    const [createdQuiz, setCreatedQuiz] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(null)

    const handleInputChange = (e, questionIndex, optionIndex = null, selectCorrect = false) => {
        const updatedQuestions = [...questions]
        if (selectCorrect) {
            if (updatedQuestions[questionIndex].answer !== -1) {
                // document.getElementById(questionIndex + ":" + (updatedQuestions[questionIndex].answer)).parentElement.classList.remove("bg-green-400")
                e.target.parentElement.parentElement.querySelectorAll('textarea').forEach((textarea) => {
                    textarea.classList.remove("bg-green-400")
                })
            }
            // e.target.parentElement.classList.add('bg-green-400')
            e.target.parentElement.querySelectorAll('textarea').forEach((textarea) => {
                textarea.classList.add("bg-green-400")
            })
            updatedQuestions[questionIndex].answer = optionIndex
            setQuestions(updatedQuestions)
            return
        }
        if (questionIndex !== null && optionIndex !== null) {
            updatedQuestions[questionIndex].options[optionIndex] = e.target.value
            setQuestions(updatedQuestions)
        } else if (questionIndex !== null && optionIndex === null) {
            updatedQuestions[questionIndex].title = e.target.value
            setQuestions(updatedQuestions)
        }
        e.target.style.width = ((e.target.value.length + 3) * 8) + "px"
        // e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    const handleAddQuestion = () => {

        if (!checkInputs()) {
            return
        }
        setQuestions([...questions, { title: '', options: ['', '', '', ''], answer: -1 }])
    }

    const checkInputs = () => {
        let valid = true
        document.querySelectorAll('textarea').forEach((textarea) => {
            if (textarea.value.trim() === '') {
                textarea.classList.add('border-red-500')
                valid = false
                if (showToast == null) {
                    setShowToast({ message: "Please fill all the fields", type: "error" })
                }
            } else {
                textarea.classList.remove('border-red-500')
            }
        }
        )
        if (valid && document.querySelectorAll('input[type="radio"]:checked').length !== questions.length) {
            setShowToast({ message: "Please select the correct answer for all the questions", type: "error" })
            valid = false
        }
        if (valid) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (showToast != null) {
            setTimeout(() => {
                setShowToast(null)
            }, 5000)
        }
    }, [showToast])

    const handleCreateQuiz = () => {
        if (!checkInputs()) {
            return
        }
        setLoading(true)
        fetch('https://aspire-nex-blue.vercel.app/api/createQuiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questions })
        }).then(res => res.json()).then(data => {
            setTimeout(() => {
                setCreatedQuiz(data.url);
                setLoading(false);
            }, 3000);
        })
    }

    // useEffect(() => {
    //     if (createdQuiz) {
    //         setLoading(false)
    //     }
    // }, [createdQuiz])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        document.body.appendChild(script);
    }, [])

    const QuizCreated = ({ createdQuiz }) => {
        return <div className='flex flex-row items-center justify-center w-[100vw] h-[100vh] bg-green-400 gap-[10px]'>
            <lottie-player src="https://lottie.host/f61b4eea-5712-42c3-ab5a-79387cfec522/4CFG4nJJoq.json" background="##FFFFFF" speed="0.5" style={{ width: 200, height: 200, zIndex: 1 }} loop autoplay direction="1" mode="normal"></lottie-player>
            <ShareSocial title={'Quiz Created Successfully!!! Share on Social Platforms'} style={shareStyle} url={createdQuiz} socialTypes={['facebook', 'whatsapp', 'twitter', 'reddit', 'linkedin', 'telegram', 'line']} />
            <lottie-player src="https://lottie.host/f61b4eea-5712-42c3-ab5a-79387cfec522/4CFG4nJJoq.json" background="##FFFFFF" speed="0.5" style={{ width: 200, height: 200, zIndex: 1, transform: "scaleX(-1)" }} loop autoplay direction="0" mode="normal"></lottie-player>
            <lottie-player src="https://lottie.host/2ef7c797-194b-45d6-9aa8-ea84c43a3ff9/JLM5qM0nEm.json" background="##FFFFFF" speed="0.5" style={{ width: 800, height: 800, position: 'absolute', zIndex: 1 }} loop autoplay direction="1" mode="normal">
            </lottie-player>
        </div>
    }

    const Toast = ({ message, type }) => {

        return <div id="toast-default" className={`fixed right-[20px] top-[20px] flex items-center w-full max-w-xs p-4 text-white ${type === "error" ? 'bg-red-600' : 'bg-green-500'} rounded-lg shadow`} role="alert">
            <div className="ms-3 text-sm font-normal">
                {message}
            </div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 text-white hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-400 inline-flex items-center justify-center h-8 w-8" onClick={() => {
                setShowToast(null)
            }} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>


    }

    return (
        <div className='flex flex-col gap-[20px] h-[100vh]'>
            {showToast && <Toast message={showToast.message} type={showToast.type} />}
            {loading ? (
                <LoadingAnimation key='loadingAnimation' />
            ) : (

                createdQuiz ? (
                    <QuizCreated key='quiz-created-ui' createdQuiz={createdQuiz} />
                ) : (
                    <div className='flex flex-col gap-[20px] p-[20px] mobile:items-center'>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className='question flex flex-col gap-[15px]'>
                                <div className="questionTitle flex flex-col gap-4 items-center justify-center">
                                    <p className='text-2xl font-bold'>Question {questionIndex + 1}</p>
                                    <textarea rows={1} className='resize-none rounded-md border-gray-400 border outline-none p-[5px] min-w-[250px] max-w-[80vw] text-center' type="text" value={question.title} placeholder='Question' onChange={(e) => handleInputChange(e, questionIndex)} />
                                </div>
                                <div className="options flex flex-col justify-center gap-[20px]">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className='option flex flex-row gap-[10px] items-center rounded-lg p-[10px]'>
                                            <input type="radio" id={questionIndex + ":" + (optionIndex + 1)} name={questionIndex} onChange={(e) => handleInputChange(e, questionIndex, optionIndex, true)} />
                                            <label htmlFor={questionIndex + ":" + optionIndex}>
                                                <textarea rows={1} className='resize-none rounded-md border-gray-400 border outline-none p-[5px] min-w-[250px] max-w-[80vw]' type='text' value={option} placeholder={'Option ' + (optionIndex + 1)} onChange={(e) => handleInputChange(e, questionIndex, optionIndex)} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button className='rounded-lg bg-slate-200 p-[15px] hover:bg-slate-300' onClick={handleAddQuestion}>&#65291; Add Question</button>
                        <button className='rounded-lg bg-green-400 p-[15px] hover:bg-green-500' onClick={handleCreateQuiz}>Create Quiz</button>
                    </div>
                )
            )}
        </div>
    )
}
const shareStyle = {
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: 'black',
        borderRadius: '10px',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        zIndex: 2

    },
    copyContainer: {
        border: '1px solid white',
        background: 'rgb(0,0,0,0.7)',
        borderRadius: '10px',
        overflow: 'auto'

    },
    title: {
        color: 'aquamarine',
        fontStyle: 'italic',
    }
};

export default CreateQuiz