import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import { BorderColor, Check, Delete, Info } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import {
  Avatar,
  Card,
  CardContent,
  Modal,
  Paper,
  Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { useFetch, useGET } from 'hooks'
import CustomerType from 'types/customer'
import moment from 'moment'
// import { database } from 'configs'
import Swal from 'sweetalert2'
import { formatCurrency, getArrFromObj } from '@ashirbad/js-core'
import EditUpcomingAppointmentDrawer from 'components/admin/drawer/EditUpcomingAppointmentDrawer'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // height: 600,
  bgcolor: 'background.paper',
  // border: "2px solid #000",
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

const CancelledAppointments = () => {
  const router = useRouter()
  const [petDetails, setPetDetails] = useState<any>()

  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = (data: any) => {
    setOpenInfoModal(true)
    setPetDetails(data)
  }
  const handleInfoCloseModal = () => setOpenInfoModal(false)

  const [openEditAppointmentDrawer, setOpenEditAppointmentDrawer] =
    useState(false)

  const { data, mutate } = useGET<any[]>(
    `appointment-booked-by-admin/appointment-status?status=CANCEL`
  )
  console.log(data)
  // console.log(data)
  console.log(openEditAppointmentDrawer)
  const handleDelete = (row: CustomerType) => {
    // try {
    //   database.ref(`Customers/${row?.id}`).remove()
    //   Swal.fire('Success', 'Successfully Deleted', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
  }

  const [tabelData, setTabelData] = useState([
    {
      sl: '1',
      ownerName: 'Kate',
      pet: 'Dog',
      gender: 'male',
      name: 'Cooper',
      breed: 'German Shepherd',
      age: '3',
      healthIssues: 'Injury',
      consultationType: 'Clinic',
      appointmentDate: '20-03-2022',
      appointmentTime: '15:20',
      paymentMethod: 'cash',
      createdAt: 'March 2, 2023 3:57 PM',
    },
  ])

  return (
    <AdminLayout title="Cancelled Appointments">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <Modal
            open={openInfoModal}
            onClose={handleInfoCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card
              sx={style}
              className=" dashboard-card-shadow w-[30%] border-t-4 border-b-4 border-t-theme border-b-theme  !p-6"
            >
              <Typography gutterBottom align="left">
                Owner Email :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */}{' '}
                  user@gmail.com
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Owner Contact No :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */}{' '}
                  7412589542
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Pet Name :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} Cooper
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Gender :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} Male
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Breed :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} German
                  Shepard
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Age :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} 2
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Wt :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} 10kg
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Vaccinated :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} Yes
                </span>
              </Typography>
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
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} Middle
                </span>
              </Typography>
              <Typography gutterBottom align="left">
                Payment Method :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} Cash
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
                  {/* {rowData?.state ? rowData.state : 'Not Provided'} */}{' '}
                  Odisha
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
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} BBSR
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
                                : 'Not Provided'} */}{' '}
                  752001
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
                                : 'Not Provided'} */}{' '}
                  Satyasai Enclave
                </span>
              </Typography>
            </Card>
          </Modal>
          {/* <EditUpcomingAppointmentDrawer
            open={openEditAppointmentDrawer}
            onClose={() => setOpenEditAppointmentDrawer(false)}
            // mutate={mutate}
          /> */}
          <MaterialTable
            data={
              tabelData
              // data?.success?.data
              //   ? data?.success?.data?.map((_, i) => ({ ..._, sl: i + 1 }))
              //   : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Cancelled Appointments" />}
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
                title: 'Owner Name',
                field: 'user',
                editable: 'never',
                emptyValue: '--',
                // render: ({ user }) => user.name,
                // width: "2%",
              },
              {
                title: 'Pet',
                field: 'pet',
                editable: 'never',

                emptyValue: '--',
                // render: ({ pet }) => pet.petName,

                // width: "2%",
              },

              {
                title: 'Health Issues',
                field: 'health',
                searchable: true,

                emptyValue: '--',
                // render: ({ health }) => (
                //   <>
                //     {health
                //       .map((item: any) => {
                //         return item.healthIssueParticular
                //       })
                //       .join(', ')}
                //   </>
                // ),
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Consultation Type',
                field: 'consultation',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Appointment Date',
                field: 'appointmentDate',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Appointment Time',
                field: 'appointDate',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                emptyValue: '--',
                // render(data, type) {
                //   return moment(data.appointDate).format('MMM Do YY')
                // },
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Appointment Start Time',
                field: 'appointStartTime',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                // render(data, type) {
                //   return moment(data.appointStartTime).format('LT')
                // },
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Appointment End Time',
                field: 'appointEndTime',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                // render(data, type) {
                //   return moment(data.appointEndTime).format('LT')
                // },
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Payment Method',
                field: 'paymentMethod',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
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
                      <Tooltip title="Info">
                        <Avatar
                          onClick={() => handleInfoOpen(row)}
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
                          sx={{
                            mr: '.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <Info sx={{ padding: '0px !important' }} />
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

export default CancelledAppointments
