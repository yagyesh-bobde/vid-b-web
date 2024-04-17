import React from 'react'
import Button from '../ui/Button'

interface StepCardProps {
    step: {
        id: number ,
        title: string,
        desc: string,
        button : string,
        type: number,
    }
}


const StepCard = ({ step }: StepCardProps) => {
    const colors = [
        ["bg-blue", "bg-light-blue", "bg-lighter-blue"],
        ["bg-pink", "bg-light-pink", "bg-lighter-pink"],
        ["bg-darkBlue", "bg-light-darkBlue", "bg-lighter-darkBlue"]
    ]
    
    
    return (
        <div className={`flex flex-col gap-8 py-24 px-10 items-center lg:flex-row lg:justify-end xl:w-3/4 ${step.type === 1 ? "" : "lg:flex-row-reverse"} rounded-xl ${step.id == 1 ? "bg-blue" : step.id == 2 ? "bg-pink" : "bg-darkBlue"} text-white`}>
            <div className='w-1/2 space-y-6 self-end'>
                {/* cirle div */}
                <div className='w-[35px] h-[35px] rounded-full bg-white opacity-30'></div>
                <h3 className='text-2xl font-bold'>
                    {step.title}
                </h3>
                <p>
                    {step.desc}
                </p>
                <Button variant="white" className={`rounded-md py-4 ${step.id == 1 ? "text-[#30C7F7]" : step.id == 2 ? "text-purple" : "text-[#4C30F7]"}`}>
                    {step.button}
                </Button>
            </div>
        </div>
    )
}

export default StepCard
