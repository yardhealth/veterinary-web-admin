import { AddBox } from '@mui/icons-material'
import React, { useState } from 'react'

import { Avatar, Badge, Tooltip } from '@mui/material'
import { ICONS } from 'assets'
import QuickAccessMenu from 'components/core/QuickAccessMenu'
import { useAppContext } from 'contexts'
import { useFetch } from 'hooks'
import Link from 'next/link'
import { NotificationType } from 'types'
import AccountMenu from './AccountMenu'
export default function AppBar() {
  const { user } = useAppContext()
  // const [notifications] = useFetch<NotificationType[]>(
  //   `notifications/${user?.uid}`,
  //   {
  //     filter: (notification: NotificationType) => !notification.isRead,
  //   }
  // )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <header className={`shadow h-16 bg-white`}>
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="hidden text-2xl font-bold lg:block">Admin Panel</h1>
          <div className="flex items-center gap-6">
            {/* <QuickAccessMenu /> */}
            {/* <Tooltip title="Quick Access">
              <Badge badgeContent={notifications?.length || 0} color="warning">
                <Link
                  href="/admin/notifications"
                >
                  <div className="cursor-pointer rounded-lg p-2">
                    <ICONS.Notification className="h-6 w-6 text-amber-700" />
                    <Avatar
                      variant="rounded"
                      onClick={() => handleClick}
                      className=" !cursor-pointer !p-0"
                      sx={{
                        mr: '.1vw',
                        padding: '0px !important',
                        backgroundColor: 'Highlight',
                        cursor: 'pointer',
                        color: '',
                      }}
                    >
                      <AddBox />
                    </Avatar>
                  </div>
                </Link>
              </Badge>
            </Tooltip> */}
            <Tooltip title="Notification">
              <Badge badgeContent={0} color="warning">
                <Link href="/admin/notifications">
                  <a className="cursor-pointer rounded-lg bg-amber-100 p-2">
                    <ICONS.Notification className="h-6 w-6 text-amber-700" />
                  </a>
                </Link>
              </Badge>
            </Tooltip>
            {/* <Tooltip title="User">
              <Badge color="primary" variant="dot" invisible>
                <Link href="/admin/users">
                  <a className="cursor-pointer rounded-lg bg-blue-100 p-2">
                    <ICONS.Users className="h-6 w-6 text-blue-700" />
                  </a>
                </Link>
              </Badge>
            </Tooltip> */}
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  )
}
