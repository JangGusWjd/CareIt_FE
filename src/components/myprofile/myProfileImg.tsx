'use client'

import { CameraFilled } from '@ant-design/icons'
import { useState } from 'react'
import Image from 'next/image'

export default function MyProfileImage() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }
  return (
    <div className='flex w-full flex-col items-center pb-10 pt-6'>
      {/* Todo: api 연결시 프로필 이미지를 기본 이미지로 변경 예정 */}
      <div className='relative h-32 w-32'>
        <Image
          src={image || '/image/detail-profile.jpg'}
          alt='profile-img'
          fill
          className='rounded-full object-cover'
        />
        <label
          htmlFor='fileUpload'
          className='translate-x-1/5 absolute bottom-0 right-0 flex h-[37px] w-[37px] translate-y-1/4 cursor-pointer items-center justify-center rounded-full bg-buttonGray shadow-lg'
        >
          <CameraFilled className='text-lg' />
        </label>
      </div>
      <input type='file' className='hidden' id='fileUpload' onChange={handleImageChange} />
    </div>
  )
}
