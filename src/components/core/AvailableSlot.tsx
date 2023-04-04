import React, { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useGET } from 'hooks'
import Swal from 'sweetalert2'
type Props = {
  className?: string
  date?: any
  onClick?: (arg: any) => void
  value?: string
}
const AvailableSlot = ({ className = '', date, onClick, value }: Props) => {
  const router = useRouter()
  // if (new Date(date) <= new Date()) {
  //   Swal.fire('Please select a future date')
  //   date = ''
  // }

  const { data, mutate, isLoading } = useGET<any[]>(
    `slot/get?date=${new Date(date)}&timeSection=EVENING`
  )
  const {
    data: data2,
    mutate: mutate2,
    isLoading: isLoading2,
  } = useGET<any[]>(`slot/get?date=${new Date(date)}&timeSection=MORNING`)
  // console.log(data)

  // const intime = '10:00 Am'
  // const outtime = '01:00 Pm'
  // const [result, setResult] = useState<any>([])
  // // console.log('Array', result)

  // function intervals(startString: any, endString: any) {
  //   const start = moment(startString, 'hh:mm a')
  //   const end = moment(endString, 'hh:mm a')
  //   start.minutes(Math.ceil(start.minutes() / 15) * 15)

  //   const current = moment(start)

  //   while (current <= end) {
  //     if (result.includes(current.format('hh:mm a'))) {
  //       return null
  //     } else {
  //       result.push(current.format('hh:mm a'))
  //       current.add(15, 'minutes')
  //     }
  //   }

  //   return result
  // }

  // intervals(intime, outtime)

  // const eIntime = '02:00 Pm'
  // const eOuttime = '05:00 Pm'
  // const [result2, setResult2] = useState<any>([])
  // // console.log('Array', result2)

  // function eIntervals(startString: any, endString: any) {
  //   const start = moment(startString, 'hh:mm a')
  //   const end = moment(endString, 'hh:mm a')
  //   start.minutes(Math.ceil(start.minutes() / 15) * 15)

  //   const current = moment(start)

  //   while (current <= end) {
  //     if (result2.includes(current.format('hh:mm a'))) {
  //       return null
  //     } else {
  //       result2.push(current.format('hh:mm a'))
  //       current.add(15, 'minutes')
  //     }
  //   }

  //   return result2
  // }

  // eIntervals(eIntime, eOuttime)

  return (
    <>
      <p className="py-2 font-bold text-theme">Available Slot *</p>
      <div className="rounded-md border border-theme p-7 ">
        <div className="">
          <p className="pb-3 font-semibold text-theme">Morning Session</p>
          <div
            className={`grid grid-cols-3 justify-items-center gap-x-2 gap-y-2 ${className}`}
          >
            {data2?.success?.data
              ?.filter((item) => item.breakStartTime > item.start)
              ?.map((item: any, index: any) => {
                return (
                  <>
                    <div
                      className={`w-full cursor-pointer rounded-md border border-theme p-2 text-theme transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#ff7717] hover:text-white ${
                        value?.split('@')[0] === item?.start &&
                        value?.split('@')[1] === item?.end
                          ? '!bg-[#ff7717]'
                          : 'bg-transparent '
                      } `}
                      key={index}
                      onClick={() => onClick?.(`${item?.start}@${item?.end}`)}
                    >
                      <p
                        className=""
                        // onClick={() => router.push("/user/clinic-appointment")}
                      >
                        {moment(item.start).format('LT')} -{' '}
                        {moment(item.end).format('LT')}
                      </p>
                    </div>
                  </>
                )
              })}
          </div>
        </div>

        <div className="pt-5">
          <p className="py-3 font-semibold text-theme">Evening Session</p>
          <div
            className={`grid grid-cols-3 justify-items-center gap-x-2 gap-y-2 ${className}`}
          >
            {data?.success?.data
              ?.filter((item) => item.breakStartTime < item.start)
              ?.map((item: any, index: any) => {
                return (
                  <div
                    className={`w-full cursor-pointer rounded-md border border-theme p-2 text-theme transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#ff7717] hover:text-white ${
                      value?.split('@')[0] === item?.start &&
                      value?.split('@')[1] === item?.end
                        ? '!bg-[#ff7717]'
                        : 'bg-transparent '
                    } `}
                    key={index}
                    onClick={() => onClick?.(`${item?.start}@${item?.end}`)}
                  >
                    <p
                      className=""
                      // onClick={() => router.push("/user/clinic-appointment")}
                    >
                      {moment(item.start).format('LT')} -{' '}
                      {moment(item.end).format('LT')}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default AvailableSlot
