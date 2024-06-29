import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {

    const [inputQuizId, setInputQuizId] = useState(null)

    const handleInputChange = (e) => {
        setInputQuizId(e.target.value)
    }

    return (
        <div className='flex flex-col justify-center bg-gray-100 h-[100vh]'>
            <div className="container mx-auto mt-10">
                <div className="text-center py-20 px-20 bg-white rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold mb-6">Create and Take Quizzes Easily</h2>
                    <p className="text-lg mb-8">Create your own quizzes or take existing ones by entering a quiz ID.</p>
                    <div className="flex flex-row mobile:flex-col justify-center items-center gap-[20px]">
                        <NavLink className="bg-blue-600 text-white py-3 px-6 h-fit rounded-lg font-semibold hover:bg-blue-700 mobile:max-w-[300px]" to="/create">Create a Quiz</NavLink>
                        <div className="flex items-center gap-[5px] p-[10px]">
                            <input type="text" placeholder="Enter Quiz ID or Weblink" className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" onChange={handleInputChange} />
                            <NavLink className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700" to={`/quiz/${inputQuizId}`}>Take Quiz</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home