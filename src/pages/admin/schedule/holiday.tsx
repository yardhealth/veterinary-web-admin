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
import EditUpcomingAppointmentDrawer from 'components/admin/drawer/EditUpcomingAppointmentDrawer'
import Status from 'components/core/Status'
import EditScheduleDrawer from 'components/admin/drawer/EditScheduleDrawer'
import AddHolidayDrawer from 'components/admin/drawer/AddHolidayDrawer'

const Holiday = () => {
  const router = useRouter()

  const [openAddHolidayDrawer, setOpeAddHolidayDrawer] = useState(false)

  const [data, isLoading] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  // console.log(data)
  console.log(openAddHolidayDrawer)
  const handleDelete = (row: CustomerType) => {
    // try {
    //   database.ref(`Customers/${row?.id}`).remove()
    //   Swal.fire('Success', 'Successfully Deleted', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
  }

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      day: 'mon',
      slot: '10:00',
      reason: 'Personal',
      createdAt: 'March 2, 2023 3:57 PM',
    },
  ])

  return (
    <AdminLayout title="Holiday">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <AddHolidayDrawer
            open={openAddHolidayDrawer}
            onClose={() => setOpeAddHolidayDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Holiday" />}
            options={{
              ...MuiTblOptions(),
              sorting: true,
            }}
            columns={[
              {
                title: '#',
                field: 'sl',
                editable: 'never',
                width: '2%',
                filtering: false,
              },
              {
                title: 'Day',
                field: 'day',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Slot',
                field: 'slot',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },

              // {
              //   title: 'Reason',
              //   field: 'reason',
              //   searchable: true,
              //   export: true,
              //   emptyValue: '--',
              //   //   hidden:true,

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
                          onClick={() => setOpeAddHolidayDrawer(true)}
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
                          // onClick={() => handleDelete(row?.id)}
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
                tooltip: 'Add Schedule',
                isFreeAction: true,
                onClick: () => {
                  setOpeAddHolidayDrawer(true)
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Holiday
