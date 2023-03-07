import { BorderColor, Cancel, CheckCircle, Delete } from '@mui/icons-material'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import HeadStyle from 'components/core/HeadStyle'
import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import moment from 'moment'
import { useFetch } from 'hooks'
import TimeSheetType from 'types/timesheet'
import EditTimeSheetDrawer from 'components/admin/drawer/EditTimeSheetDrawer'
import CustomerType from 'types/customer'
import { database } from 'configs'
import Swal from 'sweetalert2'

const TimeSheet = () => {
  const [data, isLoading] = useFetch<TimeSheetType[]>(`/TimeSheets`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  console.log(data)
  const router = useRouter()

  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)

  const gotoAddInvoice = () => {
    router.push('./addTimeSheet')
  }
  const handleDelete = (row: TimeSheetType) => {
    try {
      database.ref(`TimeSheets/${row?.id}`).remove()
      Swal.fire('Success', 'Successfully Deleted', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    }
  }
  return (
    <AdminLayout title="Admin-TimeSheets">
      <div className="grid  grid-cols-12 content-between  gap-6 px-5 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditTimeSheetDrawer
            open={openAddCustomerDrawer}
            onClose={() => setOpenAddCustomerDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
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
            title={<HeadStyle name="Time Sheets" />}
            options={{
              ...MuiTblOptions(),
              // selection: true,
              // filtering: true,
              sorting: true,
            }}
            isLoading={isLoading}
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
                searchable: true,
                filtering: false,
                // width: "2%",
              },
              {
                title: 'Task Name',
                field: 'taskName',
                editable: 'never',
                headerStyle: {
                  textAlign: 'center',
                },
                // width: "2%",
                searchable: true,
                filtering: false,
              },

              {
                title: 'Time Spent (HH:MM)',
                field: 'timeSpent',
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
              },

              {
                title: 'User',
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
                          onClick={() => setOpenAddCustomerDrawer(row)}
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
            actions={[
              {
                icon: 'add',
                tooltip: 'Add TimeSheet',
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

export default TimeSheet
