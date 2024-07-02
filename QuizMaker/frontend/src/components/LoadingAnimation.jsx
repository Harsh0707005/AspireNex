import React, { useState } from 'react'
import Lottie from 'react-lottie'
import animationData from './../lotties/loading.json'

const LoadingAnimation = () => {
    const [isPaused, setIsPaused] = useState(false)
    const [isStopped, setIsStopped] = useState(false)
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div className='flex flex-row w-[100%] h-[100%] justify-center items-center bg-green-400'>
            <Lottie options={defaultOptions}
              height={300}
              width={300}
              isStopped={isStopped}
              isPaused={isPaused}/>
        </div>
    )
}

export default LoadingAnimation