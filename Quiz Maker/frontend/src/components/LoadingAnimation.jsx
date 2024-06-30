import React from 'react'

const LoadingAnimation = () => {
    return (
        <div className='flex flex-row w-[100%] h-[100%] justify-center items-center bg-green-400'>
            <lottie-player src="https://lottie.host/bf5d2b0e-16e5-4c62-876f-61c86aea2b7a/Ps5vNDl4V2.json" background="##3490dc" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay direction="1" mode="normal"></lottie-player>
        </div>
    )
}

export default LoadingAnimation