import React, { useEffect, useState } from 'react'

const CreateQuiz = () => {
    const [questions, setQuestions] = useState([{ title: 'rj', options: ['abc', 'cds', '', ''], answer: -1 }])

    const handleInputChange = (e, questionIndex, optionIndex = null, selectCorrect = false) => {
        const updatedQuestions = [...questions]
        if (selectCorrect) {
            if (updatedQuestions[questionIndex].answer !== -1){
                // document.getElementById(questionIndex + ":" + (updatedQuestions[questionIndex].answer)).parentElement.classList.remove("bg-green-400")
                document.getElementById(questionIndex + ":" + (updatedQuestions[questionIndex].answer)).parentElement.querySelectorAll('input').forEach((input) => {
                    input.classList.remove("bg-green-400")
                })
            }
            // e.target.parentElement.classList.add('bg-green-400')
            e.target.parentElement.querySelectorAll('input').forEach((input) => {
                input.classList.add("bg-green-400")
            })
            updatedQuestions[questionIndex].answer = optionIndex + 1
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
    }

    const handleAddQuestion = () => {
        setQuestions([...questions, { title: '', options: ['', '', '', ''], answer: -1 }])
    }

    const handleCreateQuiz = () => {
        fetch('http://localhost:3000/api/createQuiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({questions})
        }).then(res => res.text()).then(data => console.log(data))
    }

    // useEffect(() => {
    //     console.log(questions)
    // }, [questions])
    return (
        <div className='flex flex-col gap-[20px]'>
            {questions.map((question, questionIndex) => {
                return <div key={questionIndex} className='question flex flex-col gap-[15px]'>
                    <div className="questionTitle flex flex-row gap-4 items-center justify-center">
                        <label>Q{questionIndex + 1}.</label>
                        <input className='rounded-md border-gray-400 border outline-none p-[5px]' type="text" value={question.title} placeholder='Question' onChange={(e) => handleInputChange(e, questionIndex)} />
                    </div>
                    <div className="options flex flex-col justify-center gap-[20px]">
                        {question.options.map((option, optionIndex) => {
                            return <div key={optionIndex} className='option flex flex-row gap-[10px] items-center rounded-lg p-[10px]'>
                                <input type="radio" id={questionIndex + ":" + (optionIndex+1)} name={questionIndex} onChange={(e) => handleInputChange(e, questionIndex, optionIndex, true)} />
                                <label htmlFor={questionIndex + ":" + optionIndex}>
                                    <input className='rounded-md border-gray-400 border outline-none p-[5px]' type='text' value={option} placeholder={'Option ' + (optionIndex + 1)} onChange={(e) => handleInputChange(e, questionIndex, optionIndex = optionIndex)} />
                                </label>
                            </div>
                        })}
                    </div>
                </div>
            })}
            <button className='rounded-lg bg-slate-200 p-[15px] hover:bg-slate-300' onClick={handleAddQuestion}>&#65291; Add Question</button>
            <button className='rounded-lg bg-green-400 p-[15px] hover:bg-green-500' onClick={handleCreateQuiz}>Create Quiz</button>
        </div>
    )
}

export default CreateQuiz