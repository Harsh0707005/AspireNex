import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import CreateQuiz from './components/CreateQuiz.jsx'
import Quiz from './components/Quiz.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <> </>
  },
  {
    path: "/create",
    element: <> <CreateQuiz /> </>
  },
  {
    path: "/quiz/:quizId",
    element: <> <Quiz /> </>
  },
  {
    path: "/profile/:username",
    element: <></>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>,
  <RouterProvider router={router} />
)
