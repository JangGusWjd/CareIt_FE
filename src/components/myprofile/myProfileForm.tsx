'use client'

import { useForm, FormProvider } from 'react-hook-form'
import MyProfileImage from '@/components/myprofile/myProfileImg'
import MyProfileInfo from '@/components/myprofile/myProfileInfo'

export default function MyProfileForm() {
  const methods = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <main className='p-4 pb-8'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MyProfileImage />
          <MyProfileInfo />
          <div className='flex w-full gap-4 pt-8'>
            <button
              type='button'
              className='w-1/2 rounded-full bg-buttonGray py-3 hover:bg-gray-300'
            >
              나가기
            </button>
            <button
              type='submit'
              className='w-1/2 rounded-full bg-customGreen py-3 text-white hover:bg-customLightGreen'
            >
              입력완료
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  )
}
