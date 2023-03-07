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
import moment from 'moment'
import AddExpenseDrawer from 'components/admin/drawer/AddExpenseDrawer'
import { useFetch } from 'hooks'
import { formatCurrency } from '@ashirbad/js-core'
import Swal from 'sweetalert2'
import { database, storage } from 'configs'

const AllExpenses = () => {
  const router = useRouter()

  const gotoCreateExpenses = () => {
    router.push('./create-expenses')
  }
  const [data, isLoading] = useFetch<any[]>(`/Expenses`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<any[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const [categories] = useFetch<any[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)
  console.log(data)
  const handleDelete = async (row: any) => {
    try {
      if (row?.documentUrl) {
        const fileRef = `Customers/${row?.customerName}/photoUrl`
        await storage.ref(fileRef).delete()
        await database
          .ref(`Customers/${row?.customerName}/Expenses/${row?.id}`)
          .remove()
        await database.ref(`Expenses/${row?.id}`).remove()
        Swal.fire('Success', 'Successfully Updated', 'success')
      } else {
        await database
          .ref(`Customers/${row?.customerName}/Expenses/${row?.id}`)
          .remove()
        await database.ref(`Expenses/${row?.id}`).remove()
        Swal.fire('Success', 'Successfully Updated', 'success')
      }
    } catch (err) {
      console.log(err)
      Swal.fire('Error', 'Something Went Wrong', 'error')
    }
  }
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid grid-cols-12 content-between  gap-6 px-4 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <AddExpenseDrawer
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
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Expenses" />}
            options={{
              ...MuiTblOptions(),
              // selection: true,
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
                title: 'Date',
                field: 'date',
                editable: 'never',
                // width: "2%",
                searchable: true,
                filtering: false,
              },
              {
                title: 'Expense Account',
                field: 'category',
                editable: 'never',
                searchable: true,
                filtering: false,
                render: ({ category }) =>
                  `${
                    categories?.find((customer) => customer.id === category)
                      ?.categoryName
                  }`,
                // width: "2%",
              },

              {
                title: 'Invoice',
                field: 'invoiceNumber',
                searchable: true,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,

                filtering: false,
              },

              {
                title: 'Customer Name',
                field: 'customerName',
                searchable: true,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
                filtering: false,
                render: ({ customerName }) =>
                  `${
                    customers?.find((customer) => customer.id === customerName)
                      ?.primaryContact
                  } (${
                    customers?.find((customer) => customer.id === customerName)
                      ?.email
                  })`,
              },
              // {
              //   title: 'Status',
              //   field: 'status',

              //   searchable: true,
              //   export: true,
              //   emptyValue: 'Not Provided',
              //   //   hidden:true,
              //   filtering: false,
              // },
              {
                title: 'Amount',
                field: 'amount',
                searchable: true,
                filtering: false,
                render: ({ amount }) => formatCurrency(amount),
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
                            Notes:
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {''}{' '}
                              {rowData?.notes ? rowData?.notes : 'Not Provided'}
                            </span>
                          </Typography>
                          <Typography variant="h6" gutterBottom align="left">
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
                tooltip: 'Create Expenses',
                isFreeAction: true,
                onClick: () => {
                  gotoCreateExpenses()
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllExpenses
