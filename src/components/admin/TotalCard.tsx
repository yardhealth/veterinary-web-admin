import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useRouter } from 'next/router'

type INFO = {
  title: string
  subTitle: any
  currentValue?: any
  overDueValue?: any
  url: any
}

const TotalCard = ({
  title,
  subTitle,
  currentValue,
  overDueValue,
  url,
}: INFO) => {
  const router = useRouter()
  return (
    <div className="rad flex basis-1/2 cursor-pointer flex-col rounded-lg border px-6 py-4 shadow-3xl ">
      <div className="flex items-center justify-between border-b py-3">
        <div className="flex items-center gap-2 ">
          <h1 className="text-2xl font-semibold text-theme">{title}</h1>
          {/* <div className="text-xs text-blue-800">
            <HelpOutlineIcon />
          </div> */}
        </div>
        <div className="flex gap-2">
          <div className="cursor-pointer text-theme">
            <AddCircleIcon onClick={() => router.push(url)} />
          </div>
          <p>New</p>
        </div>
      </div>

      <div className="mt-5 text-lg">
        <p>{subTitle}</p>
      </div>

      {/* <div className="mt-5 flex justify-between gap-4">
        <div className="basis-1/2 p-2">
          <p className="text-md font-semibold text-blue-500">Current</p>
          <h1 className="mt-2 text-2xl">{currentValue}</h1>
        </div>
        <div className="basis-1/2 p-2 ">
          <p className="text-md font-semibold text-red-500">OverDue</p>
          <h1 className="mt-2 text-2xl">{overDueValue}</h1>
        </div>
      </div> */}
    </div>
  )
}

export default TotalCard
