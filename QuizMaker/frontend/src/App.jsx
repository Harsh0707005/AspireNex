import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateQuiz from './components/CreateQuiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CreateQuiz />
    </>
  )
}

export default App
