'use client'

import ProgressBar from '@/components/profile/progressBar'
import StepForm from '@/components/profile/stepForm'
import StepComplete from '@/components/profile/stepComplete'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'

export default function ProfilePage() {
  const [step, setStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const methods = useForm()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  const totalSteps = type === 'care' ? 9 : 5
  const buttonColor =
    type === 'care'
      ? 'bg-customGreen hover:bg-customLightGreen'
      : 'bg-customBlue hover:bg-customLightBlue'

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))
  const nextStep = async () => {
    const isValid = await methods.trigger()
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const onSubmit = (data: any) => {
    // Todo: 프로필 등록 api 연결
    setIsComplete(true)
  }

  return isComplete ? (
    <StepComplete type={type} />
  ) : (
    <>
      <header className='flex h-[10%] items-center p-4'>
        <ProgressBar step={step} totalSteps={totalSteps} type={type} />
      </header>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex h-[90%] flex-col justify-between px-4'
        >
          <StepForm step={step} nextStep={nextStep} type={type} />
          {step > 1 && (
            <div className='flex justify-between gap-8 py-8'>
              <button
                onClick={prevStep}
                disabled={step === 1}
                type='button'
                className='w-[50%] rounded-full bg-buttonGray py-4 font-semibold hover:bg-gray-300'
              >
                이전
              </button>
              {step < totalSteps ? (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    nextStep()
                  }}
                  type='button'
                  className={`${buttonColor} w-[50%] rounded-full font-semibold text-white`}
                >
                  다음으로
                </button>
              ) : (
                <button type='submit' className={`${buttonColor} w-full rounded-full text-white`}>
                  입력완료
                </button>
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </>
  )
}
