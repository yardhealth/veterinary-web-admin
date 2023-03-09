import {
  BorderColor,
  ContactPhone,
  CurrencyRupee,
  Email,
  Info,
  LocalPhone,
  Person,
} from '@mui/icons-material'
import * as Yup from 'yup'

const AddNewCategorySchema = [
  {
    key: '12',
    // placeholder: 'Enter your email',
    name: 'animalName',
    label: 'Animal Name *',
    placeholder: '',
    styleContact: 'rounded-lg',
    type: 'text',
    validationSchema: Yup.string().required('Animal name is required'),
    initialValue: '',
    icon: <BorderColor />,
    required: true,
  },
  {
    key: '5',
    name: 'description',
    label: 'Description *',
    placeholder: '',
    type: 'text',
    // styleContact: "rounded-lg",
    validationSchema: Yup.string().required('Description is required'),
    initialValue: '',
    icon: <Info />,
    required: true,
    multiline: true,
    rows: 2,
  },
]
export default AddNewCategorySchema
