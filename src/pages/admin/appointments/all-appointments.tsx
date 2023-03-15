import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import {
  BorderColor,
  Close,
  Delete,
  Done,
  Info,
  Person,
  Transgender,
  Update,
} from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import {
  Avatar,
  Box,
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
import { useMemo, useState } from 'react'
import { useFetch } from 'hooks'
import CustomerType from 'types/customer'
import moment from 'moment'
import { database } from 'configs'
import Swal from 'sweetalert2'
import { formatCurrency, getArrFromObj } from '@ashirbad/js-core'
import EditUpcomingAppointmentDrawer from 'components/admin/drawer/EditUpcomingAppointmentDrawer'
import Status from 'components/core/Status'
import * as Yup from 'yup'
import { TextInput } from 'components/core'
import { Form, Formik } from 'formik'
import { LoadingButton } from '@mui/lab'

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

  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = () => setOpenInfoModal(true)
  const handleInfoCloseModal = () => setOpenInfoModal(false)

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

  const AddHolidaySchema = useMemo(() => {
    return [
      {
        key: '1',
        // placeholder: 'Enter your name',
        name: 'day',
        label: 'Select Day *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Day is required'),
        initialValue: '20-03-2023',
        type: 'date',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },

      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'slot',
        label: 'Select Slot *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'multi-select',
        validationSchema: Yup.string().required('Slot is required'),
        initialValue: '',
        icon: <Transgender />,
        required: true,
        options: [
          {
            label: 'Full day',
            value: 'Full day',
          },
          {
            label: '10:15 AM - 10:30 AM',
            value: '10:15 AM - 10:30 AM',
          },
          {
            label: '10:30 AM - 10:45 AM',
            value: '10:30 AM - 10:45 AM',
          },
          {
            label: '10:45 AM - 11:00 AM',
            value: '10:45 AM - 11:00 AM',
          },
          {
            label: '11:00 AM - 11:15 AM',
            value: '11:00 AM - 11:15 AM',
          },
          {
            label: '11:15 AM - 11:30 AM',
            value: '11:15 AM - 11:30 AM',
          },
          {
            label: '11:30 AM - 11:45 AM',
            value: '11:30 AM - 11:45 AM',
          },
          {
            label: '11:45 AM - 12:00 AM',
            value: '11:45 AM - 12:00 AM',
          },
          {
            label: '12:00 AM - 12:15 PM',
            value: '12:00 AM - 12:15 PM',
          },
          {
            label: '12:15 PM - 12:30 PM',
            value: '12:15 PM - 12:30 PM',
          },
          {
            label: '12:30 PM - 12:45 PM',
            value: '12:30 PM - 12:45 PM',
          },
        ],
      },
    ]
  }, [])

  // console.log(open)
  const initialValues = AddHolidaySchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddHolidaySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    try {
      database
        .ref(`Items`)
        .push({ ...values, createdAt: new Date().toString() })
      // onClose()
      submitProps.resetForm()
      Swal.fire('Success', 'Successfully added', 'success')
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

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSend}
              >
                {(formik) => (
                  <Form>
                    {AddHolidaySchema?.map((inputItem, index) => (
                      <div key={index}>
                        {inputItem.name === 'slot' && 'day' ? (
                          <div
                            className={
                              ''
                              // inputItem?.multiline ? "col-span-2 w-full" : "w-full"
                            }
                          >
                            <TextInput
                              fullWidth
                              key={index}
                              name={inputItem?.name}
                              title={inputItem?.label}
                              options={inputItem.options}
                              // multiline={inputItem?.multiline}
                              // rows={inputItem?.rows}
                              type={inputItem?.type as any}
                              startIcon={inputItem?.icon}
                              // styleContact={inputItem?.styleContact}
                              error={Boolean(
                                formik?.touched[inputItem.name] &&
                                  formik?.errors[inputItem.name]
                              )}
                              helperText={
                                formik?.errors[inputItem.name] as string
                              }
                              value={formik?.values[inputItem.name]}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                          </div>
                        ) : (
                          <div
                            className={
                              ''
                              // inputItem?.multiline ? "col-span-2 w-full" : "w-full"
                            }
                          >
                            <TextInput
                              fullWidth
                              key={index}
                              name={inputItem?.name}
                              title={inputItem?.label}
                              options={inputItem.options}
                              // multiline={inputItem?.multiline}
                              // rows={inputItem?.rows}
                              type={inputItem?.type as any}
                              startIcon={inputItem?.icon}
                              // styleContact={inputItem?.styleContact}
                              error={Boolean(
                                formik?.touched[inputItem.name] &&
                                  formik?.errors[inputItem.name]
                              )}
                              helperText={
                                formik?.errors[inputItem.name] as string
                              }
                              value={formik?.values[inputItem.name]}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    <div>
                      <div className="mt-2 mb-2">
                        <LoadingButton
                          className="btn-background !bg-theme"
                          variant="contained"
                          type="submit"
                          fullWidth
                          disabled={formik.isSubmitting || !formik.isValid}
                          loading={formik.isSubmitting}
                          loadingPosition="start"
                          startIcon={<Done />}
                        >
                          Reschedule
                        </LoadingButton>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>

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
                field: 'ownerName',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Pet',
                field: 'pet',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },

              {
                title: 'Health Issues',
                field: 'healthIssues',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Consultation Type',
                field: 'consultationType',
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
                field: 'appointmentTime',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
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
                  moment(new Date(createdAt)).format('lll'),
              },

              {
                title: 'Status',
                cellStyle: {
                  textAlign: 'right',
                },
                export: true,
                // width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex gap-1">
                      <Tooltip title="Accept">
                        <Avatar
                          // onClick={() => setOpenEditAppointmentDrawer(true)}
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
                          // onClick={() => setOpenEditAppointmentDrawer(true)}
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
                          onClick={handleOpen}
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
                          onClick={handleInfoOpen}
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
            //                 Pet Name :
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
            //                 Gender :
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
            //                 Breed :
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
            //                 Age :
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
            //                 Wt :
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
            //                 Vaccinated :
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
            //                 Payment Method :
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

export default AllAppointments
