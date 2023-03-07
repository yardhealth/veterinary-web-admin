import { BorderColor, Cancel, CheckCircle, Delete } from '@mui/icons-material'
import MaterialTable from '@material-table/core'
import { Avatar, Card, CardContent, Paper, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import HeadStyle from 'components/core/HeadStyle'
import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import moment from 'moment'
import EditInVoiceDrawer from 'components/admin/invoice/EditInvoice'
import { useFetch } from 'hooks'
import { formatCurrency } from '@ashirbad/js-core'
import Swal from 'sweetalert2'
import { database } from 'configs'

const Invoices = () => {
  const router = useRouter()

  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)

  const gotoAddInvoice = () => {
    router.push('./addInvoice')
  }

  const [openAddItemDrawer, setOpenAddItemDrawer] = useState(false)
  const [data, isLoading] = useFetch<any[]>(`/Invoices`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<any[]>(`/Customers`, {
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
          database.ref(`Invoices/${row?.id}`).remove()
          database.ref(`Customers/${row?.user}/Invoices/${row?.id}`).remove()
          Swal.fire('Success', 'Successfully deleted', 'success')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AdminLayout title="Admin-Invoices">
      <div className="grid grid-cols-12 content-between  gap-6 px-5 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <AddCustomerDrawer
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
            title={<HeadStyle name="Invoices" />}
            options={{
              ...MuiTblOptions(),
              // selection: true,
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
                title: 'Invoice Date',
                field: 'invoiceDate',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ invoiceDate }) =>
                  moment(invoiceDate).format('DD-MM-YYYY'),
                // width: "2%",
              },
              {
                title: 'Invoice#',
                field: 'invoice',
                headerStyle: {
                  textAlign: 'center',
                },
                // width: "2%",
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
              },

              {
                title: 'Order Number',
                field: 'orderNumber',
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
                emptyValue: 'Not Provided',
                // render: ({ user }) =>
                //   `${
                //     customers?.find((customer) => customer.id === user)
                //       ?.primaryContact
                //   } (${
                //     customers?.find((customer) => customer.id === user)?.email
                //   })`,
                //   hidden:true,
              },
              {
                title: 'Status',
                field: 'isPaid',

                lookup: {
                  true: 'Paid',
                  false: 'Unpaid',
                },
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
              },
              {
                title: 'Due Date',
                field: 'dueDate',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
              },
              {
                title: 'Tax Amount',
                field: 'taxPrice',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ taxPrice }) => formatCurrency(taxPrice || 0),
              },
              {
                title: 'Amount',
                field: 'netPrice',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ netPrice }) => formatCurrency(netPrice || 0),
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
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
                          sx={{
                            mr: '.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                          onClick={() => setOpenAddItemDrawer(row)}
                        >
                          <BorderColor sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>

                      <EditInVoiceDrawer
                        open={openAddItemDrawer}
                        onClose={() => setOpenAddItemDrawer(false)}
                      />
                      <Tooltip title="Delete">
                        <Avatar
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-700 !p-0"
                          sx={{
                            mr: '0.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                          onClick={() => handleDelete(row)}
                        >
                          <Delete sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
            detailPanel={[
              {
                tooltip: 'info',
                icon: 'info',
                openIcon: 'visibility',
                render: ({ rowData }) => (
                  <>
                    <div
                      style={{
                        padding: '12px',
                        margin: 'auto',
                        backgroundColor: '#eef5f9',
                      }}
                    >
                      <Card
                        sx={{
                          minWidth: 400,
                          maxWidth: 450,
                          transition: '0.3s',
                          margin: 'auto',
                          borderRadius: '10px',
                          // fontFamily: italic,
                          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                          '&:hover': {
                            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" gutterBottom align="left">
                            Notes: {''}
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {rowData?.customernote}
                            </span>
                          </Typography>
                          {/* <Typography variant="h6" gutterBottom align="left">
                            File:
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {' '}
                            </span>
                          </Typography> */}
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ),
              },
            ]}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add Invoice',
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

export default Invoices
