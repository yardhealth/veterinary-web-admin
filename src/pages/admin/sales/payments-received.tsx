import { Avatar, Card, CardContent, Paper, Typography } from '@mui/material'
import EditPaymentDrawer from 'components/admin/drawer/EditPaymentDrawer'
import { BorderColor, Delete } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import moment from 'moment'
import { useFetch } from 'hooks'
import CustomerType from 'types/customer'
import { formatCurrency } from '@ashirbad/js-core'
import { database } from 'configs'
import Swal from 'sweetalert2'

const PaymentReceived = () => {
  const router = useRouter()

  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)

  const gotoAddInvoice = () => {
    router.push('./addPayment')
  }

  const [data, isLoading] = useFetch<any[]>(`/Payments`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const handleDelete = (row: any) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover it again!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          database.ref(`Payments/${row?.id}`).remove()
          database.ref(`Customers/${row?.user}/Payments/${row?.id}`).remove()
          Swal.fire('Success', 'Successfully deleted', 'success')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AdminLayout title="Admin-Invoices">
      <div className="m-5 !mb-6 grid grid-cols-12  content-between gap-6 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditPaymentDrawer
            open={openAddCustomerDrawer}
            onClose={() => setOpenAddCustomerDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            isLoading={isLoading}
            data={
              data === null
                ? []
                : data
                    ?.slice()
                    .sort(
                      (a: any, b: any) =>
                        (new Date(b?.createdAt) as any) -
                        (new Date(a?.createdAt) as any)
                    )
                    .map((_: any, i: number) => ({
                      ..._,
                      sl: i + 1,
                      customer: `${
                        customers?.find((customer) => customer.id === _?.user)
                          ?.primaryContact
                      } (${
                        customers?.find((customer) => customer.id === _?.user)
                          ?.email
                      })`,
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Payment Info" />}
            options={{
              ...MuiTblOptions(),
              sorting: true,
            }}
            // editable={{
            // 	onRowAdd: (newRow) => new Promise(() => {}),
            // }}
            columns={[
              {
                title: '#',
                field: 'sl',
                editable: 'never',
                width: '2%',
                filtering: false,
              },
              {
                title: 'Payment Date',
                field: 'paymentDate',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ paymentDate }) =>
                  moment(paymentDate).format('DD-MM-YYYY'),
              },
              {
                title: 'Payment Number',
                field: 'paymentNumber',
                headerStyle: {
                  textAlign: 'center',
                },
                emptyValue: 'Not Provided',
                searchable: true,
                filtering: false,
              },

              {
                title: 'Reference Number',
                field: 'reference',
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
              },

              {
                title: 'Customer Name',
                field: 'customer',
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
              },
              {
                title: 'Invoice No',
                field: 'invoice',
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
              },
              {
                title: 'Mode',
                field: 'paymentMode',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
              },
              {
                title: 'Tax Amount',
                field: 'taxDeducted',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ taxDeducted }) => formatCurrency(taxDeducted || 0),
              },
              {
                title: 'Amount',
                field: 'amountReceived',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ amountReceived }) => formatCurrency(amountReceived),
              },
              {
                title: 'Created At',
                editable: 'never',
                field: 'createdAt',
                render: ({ createdAt }: any) =>
                  moment(new Date(createdAt)).format('LLL'),
              },
              {
                title: 'Actions',
                cellStyle: {
                  textAlign: 'right',
                },
                export: false,
                // width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => setOpenAddCustomerDrawer(row)}
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
                          sx={{
                            mr: '.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <BorderColor sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDelete(row)}
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-700 !p-0"
                          sx={{
                            mr: '0.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <Delete sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
            // detailPanel={[
            //   {
            //     tooltip: 'info',
            //     icon: 'info',
            //     openIcon: 'visibility',
            //     render: ({ rowData }) => (
            //       <>
            //         <div
            //           style={{
            //             padding: '12px',
            //             margin: 'auto',
            //             backgroundColor: '#eef5f9',
            //           }}
            //         >
            //           <Card
            //             sx={{
            //               minWidth: 400,
            //               maxWidth: 450,
            //               transition: '0.3s',
            //               margin: 'auto',
            //               borderRadius: '10px',
            //               // fontFamily: italic,
            //               boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
            //               '&:hover': {
            //                 boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
            //               },
            //             }}
            //           >
            //             <CardContent>
            //               <Typography gutterBottom align="left">
            //                 Unused Amount :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {` 4547`}
            //                 </span>
            //               </Typography>
            //             </CardContent>
            //           </Card>
            //         </div>
            //       </>
            //     ),
            //   },
            // ]}
            actions={[
              // {
              // 	icon: "upload_file",
              // 	tooltip: "Import Data",
              // 	isFreeAction: true,
              // 	onClick: () => {
              // 		// setOpenAddHolidayDrawer(true);
              // 	},
              // },
              {
                icon: 'add',
                tooltip: 'Add New',
                isFreeAction: true,
                onClick: () => {
                  gotoAddInvoice()
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default PaymentReceived
