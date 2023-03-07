import { Box, Container, Typography, Card } from '@mui/material'
import { AddPaymentForm } from 'components/admin/invoice'

import { AdminLayout } from 'layouts'
import React from 'react'

const AddPayment = () => {
  return (
    <AdminLayout title="Add-Payment">
      <Container
        maxWidth="lg"
        className="!py-5"
        // style={{
        //   width: "40vw",
        //   marginTop: "12vh",
        // }}
      >
        <Card className="dashboard-card-shadow m-auto w-[100%] border-t-4 border-b-4 border-t-theme border-b-theme !p-1">
          {/* <Card sx={{ padding: 2, marginTop: '0vh' }}> */}
          <Typography
            align="center"
            variant="h5"
            sx={{ fontWeight: 'bold' }}
            marginBottom={'6vh'}
            className="!text-theme"
          >
            Add Payment
          </Typography>
          <AddPaymentForm />
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default AddPayment
