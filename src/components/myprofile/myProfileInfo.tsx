'use client'

import { CheckOutlined } from '@ant-design/icons'
import { useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function MyProfileInfo() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const certificatesFromForm = watch('certificates') || []

  const [certificates, setCertificates] = useState<{ id: number }[]>(() =>
    certificatesFromForm.length > 0
      ? certificatesFromForm.map((_: any, index: number) => ({ id: index + 1 }))
      : [{ id: 1 }],
  )

  const [authStatus, setAuthStatus] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    if (certificates.length === certificatesFromForm.length) return
    setCertificates(certificatesFromForm.map((_: any, index: number) => ({ id: index + 1 })))
  }, [certificatesFromForm])

  const addCertificate = () => {
    if (certificates.length < 3) {
      const newId = certificates.length + 1
      setCertificates([...certificates, { id: newId }])
      setAuthStatus((prevState) => ({
        ...prevState,
        [newId]: '',
      }))
    }
  }

  const removeCertificate = (index: number) => {
    const updatedCertificates = [...certificatesFromForm]
    updatedCertificates.splice(index, 1)

    setValue('certificates', updatedCertificates)

    updatedCertificates.forEach((_, i) => {
      register(`certificates.${i}.certificate-name`)
      register(`certificates.${i}.certificate-num`)
      register(`certificates.${i}.certificate-grade`)
      register(`certificates.${i}.certificate-year`)
    })

    const newAuthStatus = { ...authStatus }
    delete newAuthStatus[index + 1]
    setAuthStatus(newAuthStatus)
  }

  return (
    <section className='flex flex-col gap-4'>
      {/* 이름 */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='name' className='px-2'>
          이름
        </label>
        <input
          id='name'
          type='text'
          {...register('name', { required: '이름을 입력하세요.' })}
          className={`rounded-xl border px-2 py-1 ${
            errors.name ? 'border-red-500' : 'border-[#111111]'
          }`}
        />
      </div>
      {/* 연락처 */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='phoneNumber' className='px-2'>
          연락처
        </label>
        <input
          id='phoneNumber'
          type='text'
          {...register('phoneNumber', {
            required: '이름을 입력하세요.',
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: '전화번호는 10자리 또는 11자리 숫자만 입력할 수 있습니다.',
            },
          })}
          className={`rounded-xl border px-2 py-1 ${
            errors.phoneNumber ? 'border-red-500' : 'border-[#111111]'
          }`}
        />
      </div>
      {/* 자격증 */}
      <div className='flex flex-col gap-1'>
        <label className='px-2'>자격증</label>
        {certificates.map((cert, index) => {
          const selectedCertificate = watch(`certificates.${index}.certificate-name`)

          return (
            <div key={cert.id} className='mb-2'>
              <div className='flex justify-between gap-4'>
                <div className='flex w-full rounded-xl border border-[#111111] bg-left px-2'>
                  <Image src='/icon/arrow.svg' alt='arrow' width={20} height={20} />
                  <select
                    {...register(`certificates.${index}.certificate-name`, {
                      required: '자격증 종류를 선택해주세요.',
                    })}
                    defaultValue=''
                    className='w-full cursor-pointer appearance-none rounded-xl bg-left py-2 pr-4'
                  >
                    <option value='' disabled>
                      자격증 종류
                    </option>
                    <option value='사회복지사'>사회복지사</option>
                    <option value='요양보호사'>요양보호사</option>
                    <option value='간호조무사'>간호조무사</option>
                    <option value='기타'>기타</option>
                  </select>
                </div>

                {certificates.length > 1 && (
                  <button
                    type='button'
                    onClick={() => removeCertificate(index)}
                    className='w-10 text-sm'
                  >
                    삭제
                  </button>
                )}
              </div>

              {selectedCertificate === '사회복지사' && (
                <div className='mt-4 flex items-center gap-4'>
                  <div className='flex w-[30%] rounded-xl border border-[#111111] bg-left px-2'>
                    <Image src='/icon/arrow.svg' alt='arrow' width={20} height={20} />
                    <select
                      {...register(`certificates.${index}.certificate-grade`, {
                        required: '자격증 등급을 선택해주세요.',
                      })}
                      defaultValue=''
                      className='w-full cursor-pointer appearance-none rounded-xl p-2'
                    >
                      <option value='' disabled>
                        등급
                      </option>
                      <option value='1급'>1급</option>
                      <option value='2급'>2급</option>
                      <option value='3급'>3급</option>
                      <option value='기타'>기타</option>
                    </select>
                  </div>
                  <span>-</span>
                  <input
                    {...register(`certificates.${index}.certificate-num`, {
                      required: '자격증 번호를 입력하세요',
                      pattern: {
                        value: /^\d{6}$/,
                        message: '올바른 자격증 번호를 입력해주세요.',
                      },
                    })}
                    type='text'
                    placeholder='숫자 6자리'
                    className='flex w-full rounded-xl border border-[#111111] p-2 px-4'
                  />
                </div>
              )}

              {selectedCertificate === '요양보호사' && (
                <div className='mt-4 flex items-center gap-4'>
                  <input
                    {...register(`certificates.${index}.certificate-year`, {
                      required: '발급 연도를 입력해주세요.',
                      pattern: {
                        value: /^20\d{2}$/,
                        message: '올바른 발급 연도를 입력해주세요.',
                      },
                    })}
                    type='text'
                    placeholder='20XX'
                    className='w-[30%] rounded-xl border border-[#111111] p-2 px-4'
                  />
                  <span className='flex items-center'>-</span>
                  <input
                    {...register(`certificates.${index}.certificate-num`, {
                      required: '자격증 번호를 입력하세요.',
                      pattern: {
                        value: /^\d{6}$/,
                        message: '올바른 자격증 번호를 입력해주세요.',
                      },
                    })}
                    type='text'
                    placeholder='숫자 6자리'
                    className='flex w-full rounded-xl border border-[#111111] p-2 px-4'
                  />
                </div>
              )}

              {selectedCertificate === '간호조무사' && (
                <div className='mt-4 flex items-center justify-center gap-4'>
                  <div className='flex w-[40%] rounded-xl border border-[#111111] bg-left px-2'>
                    <Image src='/icon/arrow.svg' alt='arrow' width={20} height={20} />
                    <select
                      {...register(`certificates.${index}.certificate-year`, {
                        required: '발급 연도를 선택해주세요.',
                      })}
                      defaultValue=''
                      className='w-full cursor-pointer appearance-none rounded-xl p-2 px-4'
                    >
                      <option value='' disabled>
                        20XX
                      </option>
                      {Array.from({ length: 2025 - 2000 + 1 }, (_, i) => (
                        <option key={i} value={2000 + i}>
                          {2000 + i}
                        </option>
                      ))}

                      <option value='no'>없음</option>
                    </select>
                  </div>
                  <span>-</span>
                  <input
                    {...register(`certificates.${index}.certificate-num`, {
                      required: '자격증 번호를 입력하세요',
                      pattern: {
                        value: /^\d{6}$/,
                        message: '올바른 자격증 번호를 입력해주세요.',
                      },
                    })}
                    type='text'
                    placeholder='숫자 6자리 입력'
                    className='flex w-full rounded-xl border border-[#111111] p-2 px-4'
                  />
                </div>
              )}
            </div>
          )
        })}

        {certificates.length < 3 && (
          <button
            type='button'
            onClick={addCertificate}
            className='mx-auto block rounded-full border bg-[#b7dab0b4] px-2 text-lg font-bold text-customGreen hover:bg-[#ccf1c5b4]'
          >
            +
          </button>
        )}
      </div>
      {/* 주소 */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='address' className='px-2'>
          주소
        </label>
        <input
          id='address'
          type='text'
          {...register('address', { required: '주소를 입력하세요.' })}
          className={`rounded-xl border px-2 py-1 ${
            errors.address ? 'border-red-500' : 'border-[#111111]'
          }`}
        />
      </div>
      {/* 차량 소유 & 치매교육 이수 */}
      <div className='flex justify-between gap-4 px-2'>
        <label className='flex items-center gap-2'>
          <span>차량 소유</span>
          <input type='checkbox' {...register('carOwnership')} className='hidden' />
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-sm ${
              watch('carOwnership') ? 'bg-customGreen' : 'bg-gray-300'
            }`}
          >
            {watch('carOwnership') && <CheckOutlined className='text-white' />}
          </div>
        </label>

        <label className='flex items-center gap-2'>
          <span>치매교육 이수</span>
          <input type='checkbox' {...register('dementiaEducation')} className='hidden' />
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-sm ${
              watch('dementiaEducation') ? 'bg-customGreen' : 'bg-gray-300'
            }`}
          >
            {watch('dementiaEducation') && <CheckOutlined className='text-white' />}
          </div>
        </label>
      </div>
      {/* 성별 */}
      <div className='flex gap-8'>
        <label className='px-2'>성별</label>
        <div className='flex gap-8'>
          {['남자', '여자'].map((gender) => (
            <label key={gender} className='flex items-center gap-2'>
              <input
                type='radio'
                value={gender}
                {...register('gender', { required: '성별을 선택하세요.' })}
                className='hidden'
              />
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-sm ${
                  watch('gender') === gender
                    ? 'bg-customGreen text-white'
                    : 'bg-buttonGray text-transparent'
                }`}
              >
                {watch('gender') === gender && <CheckOutlined />}
              </span>
              <span>{gender}</span>
            </label>
          ))}
        </div>
      </div>
      {/* 한줄소개 */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='introduce' className='px-2'>
          한줄소개
        </label>
        <input
          id='introduce'
          type='text'
          {...register('introduce')}
          className='rounded-xl border border-[#111111] px-2 py-1'
        />
      </div>
      {/* 주요 경력 */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='career' className='px-2'>
          주요경력
        </label>
        <input
          id='career'
          type='text'
          {...register('career')}
          className='rounded-xl border border-[#111111] px-2 py-1'
        />
      </div>
      {/* 경력기간 */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='date' className='px-2'>
          경력기간
        </label>
        <div className='flex items-center gap-4'>
          <input
            {...register('startDate', {
              pattern: {
                value: /^\d{6}$/,
                message: 'YYYYMM 형식으로 입력해 주세요.',
              },
            })}
            type='number'
            id='date'
            placeholder='YYYYMM'
            className='w-[50%] rounded-xl border border-[#111111] p-2 px-4'
          />
          <span>-</span>
          <input
            {...register('endDate', {
              pattern: {
                value: /^\d{6}$/,
                message: 'YYYYMM 형식으로 입력해 주세요.',
              },
            })}
            type='number'
            id='date'
            placeholder='YYYYMM'
            className='w-[50%] rounded-xl border border-[#111111] p-2 px-4'
          />
        </div>
      </div>
    </section>
  )
}
