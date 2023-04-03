import AddSchedule from 'components/admin/schedule/AddSchedule'
import { Card, Container, Typography } from '@mui/material'
import AdminLayout from 'layouts/admin'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CreateSchedule = () => {
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
    <AdminLayout title="Create Schedule">
      <Container maxWidth="xl">
        <Card className="dashboard-card-shadow m-auto w-[95%] border-t-4 border-b-4 border-t-primary border-b-primary !p-1">
          <Typography
            align="center"
            // color="text.primary"
            variant="h5"
            className="!mt-2 font-bold text-theme"
            sx={{ marginBottom: 3 }}
          >
            Create Schedule
          </Typography>
          <AddSchedule />
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default CreateSchedule
