import * as Yup from 'yup'
import { Person } from '@mui/icons-material'
import ReceiptIcon from '@mui/icons-material/Receipt'
const AddInvoiceSchema = [
  {
    key: '1',
    name: 'customer name',
    label: 'Customer Name *',
    placeholder: 'Enter Customer Name',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    type: 'text',
    validationSchema: Yup.string()
      .required('Customer Name required')
      .min(2, 'Customer Name must be at least 2 characters'),
    initialValues: '',
    icon: <Person />,
    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: '2',
    name: 'invoice',
    label: 'Invoice *',
    placeholder: 'Enter Invoice Number',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    type: 'number',
    validationSchema: Yup.string()
      .required('Invoice  required')
      .min(2, 'Invoice  must be at least 2 characters'),
    initialValues: '',
    icon: <ReceiptIcon />,
    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: '3',
    name: 'order number',
    label: 'Order Number',
    placeholder: 'Enter Order Number',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    type: 'number',
    validationSchema: Yup.string()
      .required('Invoice  required')
      .min(2, 'Invoice  must be at least 2 characters'),
    initialValues: '',
    icon: <ReceiptIcon />,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: '4',
    name: 'invoice date',
    label: 'Invoice Date *',
    placeholder: '28/01/2000',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    type: 'date',
    initialValues: '',
    icon: <ReceiptIcon />,
    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: '5',
    name: 'due date',
    label: 'Due Date',
    placeholder: '28/01/2000',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    type: 'date',
    initialValues: '',
    icon: <ReceiptIcon />,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: '6',
    name: 'subject',
    label: 'Subject',
    placeholder: 'Let your customer know what this invoice is for',
    styleContact: 'rounded-xl overflow-hidden bg-white ',
    type: 'string',
    validationSchema: Yup.string().min(
      2,
      'Subject must be at least 2 characters'
    ),
    initialValues: '',
    icon: <ReceiptIcon />,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
]
