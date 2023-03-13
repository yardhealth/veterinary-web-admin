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
  HolidayVillage,
  NoteAlt,
  LocalHospital,
  Create,
  BorderColor,
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
        key: '2',
        title: 'Appointments',
        icon: <CalendarMonth />,
        submenus: [
          {
            key: '2.1',
            route: '/admin/appointments/create-appointments',
            title: 'Create Appointment',
            icon: <Add />,
          },
          {
            key: '2.2',
            route: '/admin/appointments/upcoming-appointments',
            title: 'Upcoming Appointments',
            icon: <EventNote />,
          },
          {
            key: '2.3',
            route: '/admin/appointments/completed-appointments',
            title: 'Completed Appointments',
            icon: <EventAvailable />,
          },
        ],
      },
      {
        key: '3',
        title: 'Schedule',
        icon: <Schedule />,
        submenus: [
          {
            key: '3.1',
            route: '/admin/schedule/create-schedule',
            title: 'Create Schedule',
            icon: <MoreTime />,
          },
          {
            key: '3.2',
            route: '/admin/schedule/all-schedule',
            title: 'All Schedule',
            icon: <EventNote />,
          },
          {
            key: '3.3',
            route: '/admin/schedule/holiday',
            title: 'Holiday',
            icon: <HolidayVillage />,
          },
        ],
      },
      {
        key: '4',
        title: 'Prescription',
        icon: <LocalHospital />,
        submenus: [
          {
            key: '4.1',
            route: '/admin/prescription/create-prescription',
            title: 'Create Prescription',
            icon: <Create />,
          },
          {
            key: '4.2',
            route: '/admin/prescription/all-prescription',
            title: 'All Prescription',
            icon: <ReceiptLong />,
          },
        ],
      },
      {
        key: '5',
        title: 'Invoices',
        icon: <CurrencyRupee />,
        submenus: [
          {
            key: '5.1',
            route: '/admin/invoice/generate-invoice',
            title: 'Generate Invoice',
            icon: <BorderColor />,
          },
          {
            key: '5.2',
            route: '/admin/invoice/all-invoices',
            title: 'All Invoices',
            icon: <Receipt />,
          },
        ],
      },
      {
        key: '6',
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
        key: '7',
        title: 'Settings',
        icon: <Settings />,
        submenus: [
          {
            key: '7.1',
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
