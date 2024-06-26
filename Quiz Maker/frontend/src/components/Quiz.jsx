import React from 'react'
import { useParams } from 'react-router-dom';

const Quiz = () => {
    const { quizId } = useParams()
    fetch(`http://localhost:3000/quiz/${quizId}`)

    return (
        <div>Quiz</div>
    )
}

export default Quiz