import {
  Dashboard,
  People,
  Settings,
  Key,
  EmailOutlined,
  Help,
  Notifications,
  Groups,
  Category,
  Equalizer,
  Receipt,
  Payment,
  TrendingUp,
  Shop,
  ReceiptLong,
  BusinessCenter,
  PersonAdd,
  CurrencyRupee,
  Add,
  EventNote,
  EventRepeat,
  CalendarMonth,
  EventAvailable,
  Schedule,
  MoreTime,
} from '@mui/icons-material'
import { useAppContext } from 'contexts'

export default () => {
  const { user } = useAppContext()

  if (!user) return []
  if (user?.role === 'admin')
    return [
      {
        key: '1',
        title: 'Dashboard',
        icon: <Dashboard />,
        route: '/admin',
      },
      {
        key: '8',
        title: 'Appointments',
        icon: <CalendarMonth />,
        submenus: [
          {
            key: '4.1',
            route: '/admin/appointments/create-appointments',
            title: 'Create Appointment',
            icon: <Add />,
          },
          {
            key: '4.1',
            route: '/admin/appointments/upcoming-appointments',
            title: 'Upcoming Appointments',
            icon: <EventNote />,
          },
          {
            key: '4.2',
            route: '/admin/appointments/completed-appointments',
            title: 'Completed Appointments',
            icon: <EventAvailable />,
          },
        ],
      },
      {
        key: '9',
        title: 'Schedule',
        icon: <Schedule />,
        submenus: [
          {
            key: '4.1',
            route: '/admin/schedule/create-schedule',
            title: 'Create Schedule',
            icon: <MoreTime />,
          },
          {
            key: '4.1',
            route: '/admin/schedule/all-schedule',
            title: 'All Schedule',
            icon: <EventNote />,
          },
        ],
      },
      {
        key: '3',
        title: 'Support',
        icon: <BusinessCenter />,
        route: '/admin/items',
      },
      // {
      //   key: '4',
      //   title: 'Sales',
      //   icon: <TrendingUp />,
      //   submenus: [
      //     {
      //       key: '4.1',
      //       route: '/admin/sales/estimates',
      //       title: 'Estimates',
      //       icon: <Equalizer />,
      //     },
      //     {
      //       key: '4.2',
      //       route: '/admin/sales/invoices',
      //       title: 'Invoices',
      //       icon: <ReceiptLong />,
      //     },
      //     {
      //       key: '4.3',
      //       route: '/admin/sales/payments-received',
      //       title: 'Payments Received',
      //       icon: <Payment />,
      //     },
      //   ],
      // },
      // {
      //   key: '5',
      //   title: 'Purchases',
      //   icon: <Shop />,
      //   submenus: [
      //     {
      //       key: '5.1',
      //       route: '/admin/purchase/all-expenses',
      //       title: 'Expenses',
      //       icon: <CurrencyRupee />,
      //     },
      //   ],
      // },
      // {
      //   key: '6',
      //   title: 'Time-sheet',
      //   icon: <PunchClock />,
      //   route: '/admin/time-sheet',
      // },
      // {
      //   key: '7',
      //   title: 'Reports',
      //   icon: <Receipt />,
      //   route: '/admin/reports',
      // },

      // {
      //   key: '9',
      //   title: 'Notifications',
      //   icon: <Notifications />,
      //   route: '/admin/notifications',
      // },
      {
        key: '10',
        title: 'Settings',
        icon: <Settings />,
        submenus: [
          {
            key: '10.1',
            route: '/admin/change-password',
            title: 'Change Password',
            icon: <Key />,
          },
          // {
          //   key: '3.2',
          //   route: '/admin/update-email',
          //   title: 'Update Email',
          //   icon: <EmailOutlined />,
          // },
        ],
      },
      // {
      //   key: '4',
      //   title: 'Users',
      //   icon: <People />,
      //   route: '/admin/users',
      // },

      // {
      //   key: '5',
      //   title: 'Support',
      //   icon: <Help />,
      //   route: '/admin/support',
      // },
    ]
  return []
}
