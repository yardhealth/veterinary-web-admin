import { Avatar, Card, Modal, Paper, Typography } from '@mui/material'
import { Close, Done, Info, Update } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { useGET, useMutation } from 'hooks'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment'
import RescheduleDrawer from 'components/admin/drawer/RescheduleDrawer'

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

const AllAppointments = () => {
  const router = useRouter()
  const [activeData, setActiveData] = useState<any>()
  const [bookAppointmentDrawer, setBookAppointmentDrawer] = useState(false)
  const [petDetails, setPetDetails] = useState<any>()

  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = (data: any) => {
    setOpenInfoModal(true)
    setPetDetails(data)
  }
  const handleInfoCloseModal = () => setOpenInfoModal(false)

  const handleAppointment = (Data: any) => {
    setBookAppointmentDrawer(true)
    setActiveData(Data)
  }
  const [openEditAppointmentDrawer, setOpenEditAppointmentDrawer] =
    useState(false)

  // console.log(data)
  console.log(openEditAppointmentDrawer)
  const { data, mutate } = useGET<any[]>(
    `appointment-booked-by-admin/appointment-status?status=PENDING`
  )
  console.log(data)

  const [appointmentId, setAppointmentId] = useState<any>('')
  const { isMutating, trigger } = useMutation(
    `appointment/update-status/${appointmentId}`,
    { method: 'PATCH' }
  )

  const handleConfirm = async () => {
    const newObject: any = {
      status: 'CONFIRM',
    }
    console.log(newObject)

    try {
      const { error, success } = await trigger(newObject)
      if (error) return Swal.fire('Error', error.message, 'error')

      const status = {
        ...success?.data,
      }

      Swal.fire('Success', success.message, 'success')
      mutate()
      console.log(status)

      return
    } catch (error) {}
  }

  const handleCancel = async () => {
    const newObject: any = {
      status: 'CANCEL',
    }
    console.log(newObject)

    try {
      const { error, success } = await trigger(newObject)
      if (error) return Swal.fire('Error', error.message, 'error')

      const status = {
        ...success?.data,
      }

      Swal.fire('Success', success.message, 'success')
      mutate()
      console.log(status)

      return
    } catch (error) {}
  }

  return (
    <AdminLayout title="All Appointments">
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
              className="dashboard-card-shadow w-[30%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
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
                  {` `}
                  {petDetails?.user?.email}
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
                  {` `}
                  {petDetails?.user?.phoneNumber}
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
                  {` `}
                  {petDetails?.pet?.petName}
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
                  {` `}
                  {petDetails?.pet?.gender}
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
                  {` `}
                  {petDetails?.pet?.breed}
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
                  {` `}
                  {petDetails?.pet?.age}
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
                  {` `}
                  {petDetails?.pet?.weight}kg
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
                  {` `}
                  {petDetails?.pet?.vaccinated}
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
                  {` `}
                  {petDetails?.pet?.aggression}
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
                  {` `}
                  {petDetails?.paymentMethod}
                </span>
              </Typography>
            </Card>
          </Modal>

          <RescheduleDrawer
            open={bookAppointmentDrawer}
            onClose={() => setBookAppointmentDrawer(false)}
            activeData={activeData}
            mutate={mutate}
          />
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({
                    ..._,
                    sl: i + 1,
                    user: _?.user?.name,
                    pet: _?.pet?.petName,
                    health: _?.health
                      .map((item: any) => {
                        return item.healthIssueParticular
                      })
                      .join(', '),
                    consultation: _?.consultation?.label,
                    appointDate: moment(_?.appointDate).format('LL'),
                    appointStartTime: moment(_?.appointStartTime).format('LT'),
                    appointEndTime: moment(_?.appointEndTime).format('LT'),
                    createdAt: moment(new Date(_?.createdAt)).format('lll'),
                  }))
                : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Appointments" />}
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
                render: ({ user }) => user,
                // width: "2%",
              },
              {
                title: 'Pet Name',
                field: 'pet',
                editable: 'never',
                emptyValue: '--',
                render: ({ pet }) => pet,
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
                render: ({ health }) => health,

                filtering: false,
              },
              {
                title: 'Consultation Type',
                field: 'consultation',
                searchable: true,

                emptyValue: '--',
                render: ({ consultation }) => consultation,
                filtering: false,
              },
              {
                title: 'Appointment Date',
                field: 'appointDate',
                searchable: true,
                render(data, type) {
                  // return moment(data.appointDate).format('LL')
                  return data.appointDate
                },
                emptyValue: '--',
                filtering: false,
              },
              {
                title: 'Appointment Start Time',
                field: 'appointStartTime',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                render(data, type) {
                  // return moment(data.appointStartTime).format('LT')
                  return data.appointStartTime
                },
                emptyValue: '--',
                filtering: false,
              },
              {
                title: 'Appointment End Time',
                field: 'appointEndTime',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                render(data, type) {
                  return data.appointEndTime
                },
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Payment Method',
                field: 'paymentMethod',
                editable: 'never',
                emptyValue: '--',
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
                title: 'Status',
                cellStyle: {
                  textAlign: 'right',
                },

                render: (row) => (
                  <>
                    {console.log(row)}
                    <div className="flex gap-1">
                      <Tooltip title="Accept">
                        <Avatar
                          onClick={() => {
                            setAppointmentId(row._id)
                            Swal.fire({
                              text: 'Do you want to Continue?',
                              icon: 'question',
                              showCancelButton: true,
                            }).then((result) => {
                              if (result.value) {
                                handleConfirm()
                              }
                            })
                            //
                          }}
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-green-500 !p-0"
                          sx={{
                            mr: '.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <Done sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <Avatar
                          onClick={() => {
                            setAppointmentId(row._id)
                            Swal.fire({
                              text: 'Do you want to Continue?',
                              icon: 'question',
                              showCancelButton: true,
                            }).then((result) => {
                              if (result.value) {
                                handleCancel()
                              }
                            })
                            //
                          }}
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                          sx={{
                            mr: '.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <Close sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Reschedule">
                        <Avatar
                          // onClick={() => setOpenEditAppointmentDrawer(true)}
                          onClick={() => handleAppointment(row)}
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-[#ff7717] !p-0"
                          sx={{
                            mr: '.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <Update sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
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
                    </div>
                  </>
                ),
              },
            ]}
            actions={
              [
                // {
                //   icon: 'add',
                //   tooltip: 'Add Appointments',
                //   isFreeAction: true,
                //   onClick: () => {
                //     router.push('/admin/appointments/create-appointments')
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

export default AllAppointments
