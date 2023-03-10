import { Close, Done, Update } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

type props = {
  title1: string
  title2: string
  title3: string
}

const Status = ({ title1, title2, title3 }: props) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Tooltip title="Accept">
        <button className="flex items-center gap-1 rounded-lg bg-green-700 px-4 py-2 text-white">
          <Done fontSize="small" />
          {title1}
        </button>
      </Tooltip>
      <Tooltip title="Reject">
        <button className="flex items-center gap-1 rounded-lg bg-red-700 px-4 py-2 text-white">
          <Close fontSize="small" />
          {title2}
        </button>
      </Tooltip>
      <Tooltip title="Reschedule">
        <button className="flex items-center gap-1 rounded-lg bg-[#ff7717] px-4 py-2 text-white">
          <Update fontSize="small" />
          {title3}
        </button>
      </Tooltip>
    </div>
  )
}

export default Status
