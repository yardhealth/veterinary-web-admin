import { Box, Container, Typography } from '@mui/material'
import { AddEstimateForm } from 'components/admin/invoice'

import { AdminLayout } from 'layouts'
import React from 'react'

const AddEstimate = () => {
  return (
    <AdminLayout title="Add-Estimate">
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
            Add Estimate
          </Typography>
          <AddEstimateForm />
        </Box>
      </Container>
    </AdminLayout>
  )
}

export default AddEstimate
