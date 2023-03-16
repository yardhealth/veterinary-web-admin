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
  SettingsApplications,
  Upcoming,
  EventBusy,
  Science,
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
            route: '/admin/appointments/all-appointments',
            title: 'All Appointments',
            icon: <EventNote />,
          },
          {
            key: '2.2',
            route: '/admin/appointments/upcoming-appointments',
            title: 'Upcoming Appointments',
            icon: <Upcoming />,
          },
          {
            key: '2.3',
            route: '/admin/appointments/completed-appointments',
            title: 'Completed Appointments',
            icon: <EventAvailable />,
          },
          {
            key: '2.4',
            route: '/admin/appointments/cancelled-appointment',
            title: 'Cancelled Appointments',
            icon: <EventBusy />,
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
            route: '/admin/prescription/prescription-history',
            title: 'Prescription History',
            icon: <Receipt />,
          },
        ],
      },
      {
        key: '10',
        title: 'Reports',
        icon: <Receipt />,
        submenus: [
          {
            key: '10.1',
            route: '/admin/reports/upload-report',
            title: 'Upload Report',
            icon: <BorderColor />,
          },
          {
            key: '10.2',
            route: '/admin/prescription/prescription-history',
            title: 'View All Reports',
            icon: <Science />,
          },
        ],
      },
      {
        key: '5',
        title: 'Invoices',
        icon: <ReceiptLong />,
        submenus: [
          {
            key: '5.1',
            route: '/admin/invoices/generate-invoice',
            title: 'Generate Invoice',
            icon: <BorderColor />,
          },
          {
            key: '5.2',
            route: '/admin/invoices/all-invoices',
            title: 'All Invoices',
            icon: <ReceiptLong />,
          },
        ],
      },
      {
        key: '9',
        title: 'Pet Owner List',
        icon: <Groups />,
        route: '/admin/owner-list',
      },

      {
        key: '6',
        title: 'Config',
        icon: <SettingsApplications />,
        route: '/admin/config',
      },

      {
        key: '7',
        title: 'Support',
        icon: <BusinessCenter />,
        route: '/admin/support',
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
        key: '8',
        title: 'Settings',
        icon: <Settings />,
        submenus: [
          {
            key: '8.1',
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
