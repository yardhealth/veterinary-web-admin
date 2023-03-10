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
import { database } from 'configs'
import Swal from 'sweetalert2'
import { formatCurrency, getArrFromObj } from '@ashirbad/js-core'
import EditUpcomingAppointmentDrawer from 'components/admin/drawer/EditUpcomingAppointmentDrawer'
import Status from 'components/core/Status'

const AllSchedule = () => {
  const router = useRouter()

  const [openEditAppointmentDrawer, setOpenEditAppointmentDrawer] =
    useState(false)

  const [data, isLoading] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  // console.log(data)
  console.log(openEditAppointmentDrawer)
  const handleDelete = (row: CustomerType) => {
    try {
      database.ref(`Customers/${row?.id}`).remove()
      Swal.fire('Success', 'Successfully Deleted', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    }
  }

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      ownerName: 'Kate',
      pet: 'Dog',
      gender: 'male',
      petName: 'Cooper',
      breed: 'German Shepherd',
      age: '3',
      wt: '30kG',
      vaccinated: 'yes',
      healthIssues: 'Injury',
      consultationType: 'Clinic',
      appointmentDate: '20-03-2022',
      appointmentTime: '15:20',
      status: <Status title1="Accept" title2="Reject" title3="Reschedule" />,
      paymentMethod: 'cash',
      createdAt: 'March 2, 2023 3:57 PM',
    },
  ])

  return (
    <AdminLayout title="All Schedules">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditUpcomingAppointmentDrawer
            open={openEditAppointmentDrawer}
            onClose={() => setOpenEditAppointmentDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Schedules" />}
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
                title: 'Start Time',
                field: 'startTime',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },

              {
                title: 'End Time',
                field: 'endTime',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,

                filtering: false,
              },

              {
                title: 'Break Time',
                field: 'breakTime',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Interval Period',
                field: 'intervalPeriod',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Slot Duration',
                field: 'slotDuration',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Slot Gap',
                field: 'slotGap',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },

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
                          onClick={() => setOpenEditAppointmentDrawer(true)}
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
                            Aggression :
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {/* {rowData?.city ? rowData.city : 'Not Provided'} */}
                            </span>
                          </Typography>
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
                              {/* {rowData?.state ? rowData.state : 'Not Provided'} */}
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
                              {/* {rowData?.city ? rowData.city : 'Not Provided'} */}
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
                              {/* {rowData?.pinCode
                                ? rowData.pinCode
                                : 'Not Provided'} */}
                            </span>
                          </Typography>
                          <Typography gutterBottom align="left">
                            Street Name :
                            <span
                              style={{
                                color: 'rgb(30, 136, 229)',
                                fontSize: '15px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                              }}
                            >
                              {/* {rowData?.streetName
                                ? rowData.streetName
                                : 'Not Provided'} */}
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
                tooltip: 'Add Appointments',
                isFreeAction: true,
                onClick: () => {
                  router.push('/admin/appointments/create-appointments')
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllSchedule
