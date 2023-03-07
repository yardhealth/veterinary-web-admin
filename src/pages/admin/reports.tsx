import { Card, Container, Typography, Box, Tabs, Tab } from '@mui/material'
import { CiStar } from 'react-icons/ci'
import AdminLayout from 'layouts/admin'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AddNewPatientSchemas from 'schemas/AddNewPatientSchemas'
import RecordExpense from 'components/admin/expenses/RecordExpense'
import RecordMilage from 'components/admin/expenses/RecordMilage'
import { StarBorder } from '@mui/icons-material'
import Link from 'next/link'
interface TabPanelProps {
  children?: React.ReactNode
  index?: number
  value?: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Reports = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const handleSend = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('title', values?.title)
    formData.append('description', values?.description)
    image?.target?.files[0] && formData.append('image', image?.target?.files[0])
  }
  const initialValues = {
    title: '',
    description: '',
    clinicName: 'Select clinic',
  }
  const validationSchema = AddNewPatientSchemas?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name Required.'),
      amount: Yup.number().required('Enter amount'),
    }),
    onSubmit: () => {
      formik.resetForm()
    },
  })

  const SALES = [
    { title: 'Sales By Customer', link: '/admin/sales/invoices' },
    { title: 'Sales By Item', link: '/admin/sales/invoices' },
    { title: 'Sales By Sales Person', link: '/admin/sales/invoices' },
  ]
  const RECEIVABLES = [
    { title: 'Customer Balances', link: '/admin/customers' },
    { title: 'Invoice Details', link: '/admin/sales/invoices' },
    { title: 'Estimate Details', link: '/admin/sales/estimates' },
  ]
  const PAYMENT_RECEIVED = [
    { title: 'Payment Received', link: '/admin/sales/payments-received' },
  ]
  const PURCHASES_AND_EXPENSES = [
    { title: 'Expenses Details', link: '/admin/purchase/all-expenses' },
    { title: 'Expense By Customer', link: '/admin/purchase/all-expenses' },
  ]
  const TIMESHEET = [{ title: 'Timesheet Details', link: '/admin/time-sheet' }]

  return (
    <AdminLayout title="Reports">
      <Container
        maxWidth="xl"
        // style={{
        //   width: '40vw',
        //   marginTop: '5vh',
        // }}
      >
        <Card className="dashboard-card-shadow m-auto w-[95%] border-t-4 border-b-4 border-t-theme border-b-theme !p-5">
          <Typography
            align="center"
            // color="text.primary"
            variant="h5"
            className="!mt-2 font-bold text-theme"
            sx={{ marginBottom: 3 }}
          >
            Reports
          </Typography>

          <div className="mb-6 w-52 border-b-2 border-b-theme text-xl font-semibold text-theme">
            General Reports
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <h1 className="mb-2 w-14 border-b border-b-theme text-lg font-semibold">
                Sales
              </h1>
              {SALES?.map((sale, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-1 py-2 text-sm font-medium text-theme hover:text-blue-500"
                  >
                    <CiStar />
                    <Link href={sale.link}>
                      <p>{sale.title}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
            <div>
              <h1 className="mb-2 w-28 border-b border-b-theme text-lg font-semibold">
                Receivables
              </h1>
              {RECEIVABLES?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-1 py-2 text-sm font-medium text-theme hover:text-blue-500"
                  >
                    <CiStar />
                    <Link href={item.link}>
                      <p>{item.title}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
            <div>
              <h1 className="mb-2 w-48 border-b border-b-theme text-lg font-semibold">
                Payments Received
              </h1>
              {PAYMENT_RECEIVED?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-1 py-2 text-sm font-medium text-theme hover:text-blue-500"
                  >
                    <CiStar />
                    <Link href={item.link}>
                      <p>{item.title}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
            <div>
              <h1 className="mb-2 w-60 border-b border-b-theme text-lg font-semibold">
                Purchases And Expenses
              </h1>
              {PURCHASES_AND_EXPENSES?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-1 py-2 text-sm font-medium text-theme hover:text-blue-500"
                  >
                    <CiStar />
                    <Link href={item.link}>
                      <p>{item.title}</p>
                    </Link>
                  </div>
                )
              })}
            </div>

            <div>
              <h1 className="mb-2 w-52 border-b border-b-theme text-lg font-semibold">
                Projects and Timesheet
              </h1>
              {TIMESHEET?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center gap-1 py-2 text-sm font-medium text-theme hover:text-blue-500"
                  >
                    <CiStar />
                    <Link href={item.link}>
                      <p> {item.title}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default Reports
