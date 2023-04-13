import EditScheduleDrawer from 'components/admin/drawer/EditScheduleDrawer'
import HeadStyle from 'components/core/HeadStyle'
import { BorderColor } from '@mui/icons-material'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { useGET } from 'hooks'
import moment from 'moment'

const AllSchedule = () => {
  const router = useRouter()
  const [activeData, setActiveData] = useState<any>()

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  const { data, mutate, isLoading } = useGET<any[]>(
    `slot-management/get-slot-management`
  )
  console.log(data)

  // console.log(data)
  console.log(openEditPrescriptionDrawer)

  const handleClick = (Data: any) => {
    setOpenEditPrescriptionDrawer(true)
    setActiveData(Data)
  }

  return (
    <AdminLayout title="All Schedules">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          {activeData?._id && (
            <EditScheduleDrawer
              open={openEditPrescriptionDrawer}
              onClose={() => setOpenEditPrescriptionDrawer(false)}
              activeData={activeData}
              mutate={mutate}
            />
          )}
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({
                    ..._,
                    sl: i + 1,
                    day: moment(_?.day).format('dddd'),
                    startTimeSlot: moment(_?.startTimeSlot).format('LT'),
                    endTimeSlot: moment(_?.endTimeSlot).format('LT'),
                    breakStartTime: moment(_?.breakStartTime).format('LT'),
                    breakEndTime: moment(_?.breakEndTime).format('LT'),
                    createdAt: moment(new Date(_?.createdAt)).format('lll'),
                  }))
                : []
            }
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
                render(data, type) {
                  return data.day
                },
              },
              {
                title: 'Start Time',
                field: 'startTimeSlot',
                editable: 'never',
                emptyValue: '--',
                render(data, type) {
                  // return moment(data.startTimeSlot).format('LT')
                  return data.startTimeSlot
                },
              },

              {
                title: 'End Time',
                field: 'endTimeSlot',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
                render(data, type) {
                  // return moment(data.endTimeSlot).format('LT')
                  return data.endTimeSlot
                },
              },

              {
                title: 'Break Start Time',
                field: 'breakStartTime',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
                render(data, type) {
                  // return moment(data.breakStartTime).format('LT')
                  return data.breakStartTime
                },
              },
              {
                title: 'Break End Time',
                field: 'breakEndTime',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
                render(data, type) {
                  // return moment(data.breakEndTime).format('LT')
                  return data.breakEndTime
                },
              },

              {
                title: 'Slot Duration(mins)',
                field: 'slotDurations',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                emptyValue: '--',
                filtering: false,
                // render(data, type) {
                //   return moment(data.breakStartTime).format('llll')
                // },
              },

              {
                title: 'Created At',
                editable: 'never',
                field: 'createdAt',
                filtering: false,
                render: ({ createdAt }: any) =>
                  // moment(new Date(createdAt)).format('lll'),
                  createdAt,
              },
              {
                title: 'Actions',
                cellStyle: {
                  textAlign: 'right',
                },
                export: true,
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Edit">
                        <Avatar
                          // onClick={() => setOpenEditPrescriptionDrawer(true)}
                          onClick={() => handleClick(row)}
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
            //               boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
            //               '&:hover': {
            //                 boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
            //               },
            //             }}
            //           >
            //             <CardContent>
            //               <Typography gutterBottom align="left">
            //                 Aggression :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.city ? rowData.city : 'Not Provided'} */}
            //                 </span>
            //               </Typography>
            //               <Typography gutterBottom align="left">
            //                 State :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.state ? rowData.state : 'Not Provided'} */}
            //                 </span>
            //               </Typography>
            //               <Typography gutterBottom align="left">
            //                 City :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.city ? rowData.city : 'Not Provided'} */}
            //                 </span>
            //               </Typography>
            //               <Typography gutterBottom align="left">
            //                 Zip Code :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.pinCode
            //                     ? rowData.pinCode
            //                     : 'Not Provided'} */}
            //                 </span>
            //               </Typography>
            //               <Typography gutterBottom align="left">
            //                 Street Name :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.streetName
            //                     ? rowData.streetName
            //                     : 'Not Provided'} */}
            //                 </span>
            //               </Typography>
            //             </CardContent>
            //           </Card>
            //         </div>
            //       </>
            //     ),
            //   },
            // ]}
            actions={
              [
                // {
                //   icon: 'add',
                //   tooltip: 'Add Schedule',
                //   isFreeAction: true,
                //   onClick: () => {
                //     router.push('/admin/schedule/create-schedule')
                //   },
                // },
              ]
            }
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllSchedule
