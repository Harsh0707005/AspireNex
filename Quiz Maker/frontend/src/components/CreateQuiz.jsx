import React, { useEffect, useState } from 'react'

const CreateQuiz = () => {
    const [questions, setQuestions] = useState([{ title: 'rj', options: ['abc', 'cds', '', ''], answer: -1 }])

    const handleInputChange = (e, questionIndex, optionIndex = null, selectCorrect = false) => {
        const updatedQuestions = [...questions]
        if (selectCorrect) {
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
    }

    const handleAddQuestion = () => {
        setQuestions([...questions, { title: '', options: ['', '', '', ''], answer: -1 }])
    }

    useEffect(() => {
        console.log(questions)
    }, [questions])
    return (
        <div>
            {questions.map((question, questionIndex) => {
                return <div key={questionIndex} className='question'>
                    <div className="questionTitle">
                        <label>{questionIndex + 1}.</label>
                        <input type="text" value={question.title} placeholder='Question' onChange={(e) => handleInputChange(e, questionIndex)} />
                    </div>
                    <div className="options">
                        {question.options.map((option, optionIndex) => {
                            return <div key={optionIndex} className='option'>
                                <input type="radio" id={questionIndex + ":" + optionIndex} name={questionIndex} onChange={(e) => handleInputChange(e, questionIndex, optionIndex, true)} />
                                <label htmlFor={questionIndex + ":" + optionIndex}>
                                    <input type='text' value={option} placeholder={'Option ' + (optionIndex + 1)} onChange={(e) => handleInputChange(e, questionIndex, optionIndex = optionIndex)} />
                                </label>
                            </div>
                        })}
                    </div>
                </div>
            })}
            <button onClick={handleAddQuestion}>Add Question</button>
        </div>
    )
}

export default CreateQuiz