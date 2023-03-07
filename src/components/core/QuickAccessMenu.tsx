import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import AddItemDrawer from 'components/admin/drawer/AddItemDrawer'
import { Avatar, Tooltip } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { AddBox } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Menu from '@mui/material/Menu'
import { useState } from 'react'

export default function QuickAccessMenu() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)
  const [openAddItemDrawer, setOpenAddItemDrawer] = useState(false)

  return (
    <div>
      <AddCustomerDrawer
        open={openAddCustomerDrawer}
        onClose={() => setOpenAddCustomerDrawer(false)}
      />
      <AddItemDrawer
        open={openAddItemDrawer}
        onClose={() => setOpenAddItemDrawer(false)}
      />
      <Tooltip title="Quick Access">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar
            variant="rounded"
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
        </Button>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className=""
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          className="text-sm transition-all duration-300 ease-in-out hover:text-blue-500"
          onClick={() => router.push('./create-user')}
        >
          Add User
        </MenuItem>
        <MenuItem
          className="text-sm transition-all duration-300 ease-in-out hover:text-blue-500"
          onClick={() => {
            setOpenAddCustomerDrawer(true)
          }}
        >
          Add Customer
        </MenuItem>
        <MenuItem
          className="text-sm transition-all duration-300 ease-in-out hover:text-blue-500"
          onClick={() => {
            setOpenAddCustomerDrawer(true)
          }}
        >
          Add Item
        </MenuItem>
        <MenuItem
          className="text-sm transition-all duration-300 ease-in-out hover:text-blue-500"
          onClick={() => router.push('./addEstimate')}
        >
          Add Estimates
        </MenuItem>
        <MenuItem
          className="text-sm transition-all duration-300 ease-in-out hover:text-blue-500"
          onClick={() => router.push('./addInvoice')}
        >
          Add Invoice
        </MenuItem>
        <MenuItem
          className="text-sm transition-all duration-300 ease-in-out hover:text-blue-500"
          onClick={() => router.push('./create-expenses')}
        >
          Add Expense
        </MenuItem>
        {/* <MenuItem
          className="text-sm"
          onClick={() => router.push('./payments-received')}
        >
          Add Payment Received
        </MenuItem>
        <MenuItem className="text-sm" onClick={() => router.push('')}>
          Add Item
        </MenuItem> */}
      </Menu>
    </div>
  )
}
