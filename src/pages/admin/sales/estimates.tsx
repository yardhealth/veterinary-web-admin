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
import { EditEstimateDrawer } from 'components/admin/invoice'
import { useFetch } from 'hooks'
import { formatCurrency } from '@ashirbad/js-core'
import Swal from 'sweetalert2'
import { database } from 'configs'

const Estimates = () => {
  const router = useRouter()

  const [openAddItemDrawer, setOpenAddItemDrawer] = useState<any>(false)
  console.log(openAddItemDrawer)
  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)

  const gotoAddInvoice = () => {
    router.push('./addEstimate')
  }
  const [Estimates, isLoading] = useFetch<any[]>(`/Estimates`, {
    needNested: false,
    needArray: true,
  })
  const [users] = useFetch<any[]>(`/Users`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<any[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  console.log(Estimates)
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
          database.ref(`Estimates/${row?.id}`).remove()
          database.ref(`Customers/${row?.user}/Estimates/${row?.id}`).remove()
          Swal.fire('Success', 'Successfully deleted', 'success')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AdminLayout title="Estimates">
      <div className="m-5 !mb-6 grid grid-cols-12  content-between gap-6 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <AddCustomerDrawer
            open={openAddCustomerDrawer}
            onClose={() => setOpenAddCustomerDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            isLoading={isLoading}
            data={
              Estimates === null
                ? []
                : Estimates?.slice()
                    .sort(
                      (a: any, b: any) =>
                        (new Date(b?.createdAt) as any) -
                        (new Date(a?.createdAt) as any)
                    )
                    .map((_: any, i: number) => ({
                      ..._,
                      sl: i + 1,
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Estimates" />}
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
                title: 'Estimate Date',
                field: 'estimateDate',
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
                render: ({ estimateDate }) =>
                  moment(estimateDate).format('DD-MM-YYYY'),
              },
              {
                title: 'Estimate Number',
                field: 'estimate',
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
                field: 'user',
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                render: ({ user }) =>
                  `${
                    customers?.find((customer) => customer.id === user)
                      ?.primaryContact
                  } (${
                    customers?.find((customer) => customer.id === user)?.email
                  })`,
                //   hidden:true,
              },

              {
                title: 'Amount',
                field: 'netPrice',
                // cellStyle: {
                //   textAlign: 'left',
                // },
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

                      <EditEstimateDrawer
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
                            Sales Person: {''}
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {`${
                                users?.find(
                                  (user) => user.id === rowData?.salesperson
                                )?.displayName
                              } (${
                                users?.find(
                                  (user) => user.id === rowData?.salesperson
                                )?.email
                              })`}
                            </span>
                          </Typography>
                          <Typography variant="h6" gutterBottom align="left">
                            Customer Notes:{''}
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {rowData?.customerNote || 'NotProvided'}
                            </span>
                          </Typography>
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
                tooltip: 'Add Estimates',
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

export default Estimates
