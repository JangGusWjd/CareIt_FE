'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()

  return (
    <header className='relative flex w-full items-center border-b-[1px] border-customGreen p-4'>
      <ArrowLeftOutlined onClick={() => router.back()} className='text-[27px] text-customGreen' />
      <div className='mx-auto flex gap-2'>
        <Image src='/icon/person.svg' alt='user' width={23} height={23} />
        <h1 className='text-xl font-bold text-customGreen'>마이프로필</h1>
      </div>
    </header>
  )
}
