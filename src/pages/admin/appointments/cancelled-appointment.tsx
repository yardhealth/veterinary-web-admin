import { Avatar, Card, Modal, Paper, Typography } from '@mui/material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Info } from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import CustomerType from 'types/customer'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { useGET } from 'hooks'
import moment from 'moment'

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
                  {petDetails?.email}
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
                  {petDetails?.phoneNumber}
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
          {/* <EditUpcomingAppointmentDrawer
            open={openEditAppointmentDrawer}
            onClose={() => setOpenEditAppointmentDrawer(false)}
            // mutate={mutate}
          /> */}
          <MaterialTable
            data={
              // tabelData
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({
                    ..._,
                    sl: i + 1,
                    user: _.user?.name,
                    petName: _.pet?.petName,
                    email: _.user?.email,
                    phoneNumber: _.user?.phoneNumber,
                    health: _?.health
                      ?.map((item: any, index: any) => {
                        return item.healthIssueParticular
                      })
                      .join(', '),
                    consultation: _?.consultation?.label,
                    appointDate: moment(_?.appointDate).format('LL'),
                    appointStartTime: moment(_?.appointStartTime).format('LT'),
                    appointEndTime: moment(_?.appointEndTime).format('LT'),
                    createdAt: moment(new Date(_?.createdAt)).format('LL'),
                  }))
                : []
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
                render: ({ user }) => user,
                // width: "2%",
              },

              {
                title: 'Pet Name',
                field: 'petName',
                editable: 'never',
                emptyValue: '--',
                render: ({ petName }) => petName,

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
                render({ appointStartTime }) {
                  return appointStartTime
                },

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
                // width: "2%",
              },
              // {
              //   title: 'Payment Method',
              //   field: 'paymentMethod',
              //   searchable: true,

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
                  // moment(new Date(createdAt)).format('lll'),
                  createdAt,
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
                      {/* <Tooltip title="Delete">
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
                      </Tooltip> */}
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

export default CancelledAppointments
