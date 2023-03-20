import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import { BorderColor, Delete } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Avatar, Card, CardContent, Paper, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { useFetch } from 'hooks'
import CustomerType from 'types/customer'
import moment from 'moment'
// import { database } from 'configs'
import Swal from 'sweetalert2'
import { formatCurrency, getArrFromObj } from '@ashirbad/js-core'

const Customer = () => {
  const router = useRouter()

  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)

  const [data, isLoading] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  // console.log(data)
  console.log(openAddCustomerDrawer)
  const handleDelete = (row: CustomerType) => {
    // try {
    //   database.ref(`Customers/${row?.id}`).remove()
    //   Swal.fire('Success', 'Successfully Deleted', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
  }
  return (
    <AdminLayout title="Customers">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
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
                      companyType: _?.companyName
                        ? _?.companyName
                        : 'Indivisual',
                      receivable: formatCurrency(
                        (_?.Invoices &&
                          getArrFromObj(_?.Invoices)
                            ?.filter((item) => !item?.isPaid)
                            ?.reduce(
                              (acc, item) => item?.totalPrice + acc,
                              0
                            )) ||
                          0
                      ),
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Customers" />}
            options={{
              ...MuiTblOptions(),

              // filtering: true,
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
                title: 'Name',
                field: 'primaryContact',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Company Name',
                field: 'companyType',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },

              {
                title: 'Email',
                field: 'email',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,

                filtering: false,
              },

              {
                title: 'Work Phone',
                field: 'phoneNumber',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Receivable',
                field: 'receivable',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              // {
              //   title: 'Unused Credits',
              //   field: 'unusedCredits',
              //   cellStyle: {
              //     textAlign: 'left',
              //   },
              //   emptyValue: '--',
              //   filtering: false,
              // },
              {
                title: 'Created At',
                editable: 'never',
                field: 'createdAt',
                filtering: false,
                render: ({ createdAt }: any) =>
                  moment(new Date(createdAt)).format('lll'),
              },
              {
                title: 'Actions',
                cellStyle: {
                  textAlign: 'right',
                },
                export: true,
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
                          onClick={() => handleDelete(row?.id)}
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
                          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                          '&:hover': {
                            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                          },
                        }}
                      >
                        <CardContent>
                          <Typography gutterBottom align="left">
                            State :
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {rowData?.state ? rowData.state : 'Not Provided'}
                            </span>
                          </Typography>
                          <Typography gutterBottom align="left">
                            City :
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {rowData?.city ? rowData.city : 'Not Provided'}
                            </span>
                          </Typography>
                          <Typography gutterBottom align="left">
                            Zip Code :
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {rowData?.pinCode
                                ? rowData.pinCode
                                : 'Not Provided'}
                            </span>
                          </Typography>
                          <Typography variant="h6" gutterBottom align="left">
                            Street Name :
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {rowData?.streetName
                                ? rowData.streetName
                                : 'Not Provided'}
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
                tooltip: 'Add Customer',
                isFreeAction: true,
                onClick: () => {
                  setOpenAddCustomerDrawer(true)
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Customer
