import AddPrescription from 'components/admin/prescription/AddPrescription'
import { Card, Container, Typography, Box } from '@mui/material'
import AddNewPatientSchemas from 'schemas/AddNewPatientSchemas'
import AdminLayout from 'layouts/admin'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CreatePrescription = () => {
  const [image, setImage] = useState<any>('')

  const handleSend = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('title', values?.title)
    formData.append('description', values?.description)
    image?.target?.files[0] && formData.append('image', image?.target?.files[0])
  }

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
    <AdminLayout title="Create Prescription">
      <Container maxWidth="xl">
        <Card className="dashboard-card-shadow m-auto w-[95%] border-t-4 border-b-4 border-t-primary border-b-primary !p-1">
          <Typography
            align="center"
            variant="h5"
            className="!mt-2 font-bold text-theme"
            sx={{ marginBottom: 3 }}
          >
            Create Prescription
          </Typography>
          <AddPrescription />
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default CreatePrescription
