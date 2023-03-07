import {
  BorderAllOutlined,
  BorderColor,
  CalendarMonth,
  ContactPhone,
  CurrencyRupee,
  Email,
  Info,
  LocalPhone,
  Person,
} from '@mui/icons-material'
import * as Yup from 'yup'

const EditPaymentSchema = [
  {
    key: '1',
    name: 'date',
    label: 'Date *',
    placeholder: '',
    styleContact: 'rounded-lg',
    type: 'date',
    validationSchema: Yup.string().required('Date is required'),
    initialValue: '',
    icon: <CalendarMonth />,
    required: true,
  },
  {
    key: '3',
    // placeholder: 'Enter your email',
    name: 'payment',
    label: 'Payment *',
    placeholder: '',
    styleContact: 'rounded-lg',
    type: 'number',
    validationSchema: Yup.string().required('Payment is required'),
    initialValue: '',
    icon: <CurrencyRupee />,
    required: true,
  },
  {
    key: '7',
    // placeholder: 'Enter your email',
    name: 'reference',
    label: 'Reference Number *',
    placeholder: '',
    styleContact: 'rounded-lg',
    type: 'number',
    validationSchema: Yup.string().required('Reference Number is required'),
    initialValue: '',
    icon: <BorderColor />,
    required: true,
  },
  {
    key: '2',
    // placeholder: 'Enter your name',
    name: 'customer',
    type: 'select',
    label: 'Customer *',
    placeholder: '',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    validationSchema: Yup.string().required('Customer is required'),
    initialValue: '',
    icon: <Person />,
    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
    options: [
      {
        label: 'Customer 1',
        value: 'Customer 1',
      },
      {
        label: 'Customer 2',
        value: 'Customer 2',
      },
    ],
  },
  {
    key: '47',
    // placeholder: 'Enter your email',
    name: 'invoice',
    label: 'Invoice Number *',
    placeholder: '',
    styleContact: 'rounded-lg',
    type: 'number',
    validationSchema: Yup.string().required('Invoice Number is required'),
    initialValue: '',
    icon: <BorderColor />,
    required: true,
  },
  {
    key: '2',
    // placeholder: 'Enter your name',
    name: 'mode',
    type: 'select',
    label: 'Mode *',
    placeholder: '',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    validationSchema: Yup.string().required('Mode is required'),
    initialValue: '',
    icon: <Person />,
    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
    options: [
      {
        label: 'Bank Remittance',
        value: 'Bank Remittance',
      },
      {
        label: 'Bank Transfer',
        value: 'Bank Transfer',
      },
      {
        label: 'Cash',
        value: 'Cash',
      },
      {
        label: 'Cheque',
        value: 'Cheque',
      },
      {
        label: 'Credit Card',
        value: 'Credit Card',
      },
    ],
  },
  {
    key: '7',
    // placeholder: 'Enter your email',
    name: 'amount',
    label: 'Amount *',
    placeholder: '',
    styleContact: 'rounded-lg',
    type: 'number',
    validationSchema: Yup.string().required('Amount is required'),
    initialValue: '',
    icon: <CurrencyRupee />,
    required: true,
  },
]
export default EditPaymentSchema
