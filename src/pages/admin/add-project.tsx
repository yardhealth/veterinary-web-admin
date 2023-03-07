import { Box, Container, Typography } from '@mui/material'
import AddProjectForm from 'components/admin/timesheet/AddProjectForm'

import { AdminLayout } from 'layouts'
import React from 'react'

const AddProject = () => {
  return (
    <AdminLayout title="Add-Invoice">
      <Container
        maxWidth="lg"
        className="!py-5"
        // style={{
        //   width: "40vw",
        //   marginTop: "12vh",
        // }}
      >
        <Box sx={{ width: '100%' }}>
          {/* <Card sx={{ padding: 2, marginTop: '0vh' }}> */}
          <Typography
            align="center"
            variant="h5"
            sx={{ fontWeight: 'bold' }}
            marginBottom={'6vh'}
            className="!text-theme"
          >
            Add Invoice
          </Typography>
          <AddProjectForm />
        </Box>
      </Container>
    </AdminLayout>
  )
}

export default AddProject
