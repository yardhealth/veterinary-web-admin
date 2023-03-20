import { Card, Container, Typography, Box, Tabs, Tab } from '@mui/material'

import AdminLayout from 'layouts/admin'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AddNewPatientSchemas from 'schemas/AddNewPatientSchemas'
import RecordExpense from 'components/admin/appointments/AddAppointment'
import RecordMilage from 'components/admin/appointments/RecordMilage'
import AddAppointment from 'components/admin/appointments/AddAppointment'
import AddConfig from 'components/admin/config/AddConfig'
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

const ConsultationFee = () => {
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

  return (
    <AdminLayout title="Create Appointment">
      <Container
        maxWidth="xl"
        // style={{
        //   width: '40vw',
        //   marginTop: '5vh',
        // }}
      >
        <Card className="dashboard-card-shadow m-auto w-[95%] border-t-4 border-b-4 border-t-primary border-b-primary !p-1">
          <Typography
            align="center"
            // color="text.primary"
            variant="h5"
            className="!mt-2 font-bold text-theme"
            sx={{ marginBottom: 3 }}
          >
            Add Doctor
          </Typography>
          <AddConfig />
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default ConsultationFee
