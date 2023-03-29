import EditPrescriptionDrawer from 'components/admin/drawer/EditPrescriptionDrawer'
import { BorderColor, Delete, Info, Visibility } from '@mui/icons-material'
import { Avatar, Card, Paper, Typography } from '@mui/material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import Tooltip from '@mui/material/Tooltip'
import CustomerType from 'types/customer'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal'
import { MuiTblOptions } from 'utils'
// import { database } from 'configs'
import { useState } from 'react'
import { useFetch, useGET } from 'hooks'
import Swal from 'sweetalert2'
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

const PrescriptionHistory = () => {
  const router = useRouter()

  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = () => setOpenInfoModal(true)
  const handleInfoCloseModal = () => setOpenInfoModal(false)

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  const { data, mutate } = useGET<any[]>(`prescription/get-prescription`)
  console.log(data)
  // console.log(data)
  console.log(openEditPrescriptionDrawer)
  const handleDelete = (row: CustomerType) => {}

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      ownerName: 'Kate',
      pet: 'Dog',
      petName: 'Cooper',
      drugName: 'Ketoconazole',
      instruction: 'once a day',
      time: 'After meal',
      prescriptionNote: 'Lorem ipsum dolor sit.',
    },
  ])

  return (
    <AdminLayout title="Prescription History">
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
                Prescription Note :
                <span
                  style={{
                    color: 'rgb(30, 136, 229)',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                  }}
                >
                  {/* {rowData?.city ? rowData.city : 'Not Provided'} */} Lorem
                  ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem, officia?
                </span>
              </Typography>
            </Card>
          </Modal>
          <EditPrescriptionDrawer
            open={openEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({ ..._, sl: i + 1 }))
                : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Prescription History" />}
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
                field: 'userName',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Email',
                field: 'userMail',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Pet Category',
                field: 'petCategory',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },
              {
                title: 'Pet Name',
                field: 'petName',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },

              {
                title: 'Drug Name',
                field: 'drugName',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,

                filtering: false,
              },

              {
                title: 'Prescription Note',
                field: 'prescriptionNote',
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
              // {
              //   title: 'Actions',
              //   cellStyle: {
              //     textAlign: 'right',
              //   },
              //   export: true,
              //   // width: "18%",
              //   // field: "pick",
              //   render: (row) => (
              //     <>
              //       <div className="flex">
              //         <Tooltip title="Info">
              //           <Avatar
              //             onClick={handleInfoOpen}
              //             variant="rounded"
              //             className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
              //             sx={{
              //               mr: '.1vw',
              //               padding: '0px !important',
              //               backgroundColor: 'Highlight',
              //               cursor: 'pointer',
              //               color: '',
              //             }}
              //           >
              //             <Info sx={{ padding: '0px !important' }} />
              //           </Avatar>
              //         </Tooltip>
              //         <Tooltip title="Edit">
              //           <Avatar
              //             onClick={() => setOpenEditPrescriptionDrawer(true)}
              //             variant="rounded"
              //             className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
              //             sx={{
              //               mr: '.1vw',
              //               padding: '0px !important',
              //               backgroundColor: 'Highlight',
              //               cursor: 'pointer',
              //               color: '',
              //             }}
              //           >
              //             <BorderColor sx={{ padding: '0px !important' }} />
              //           </Avatar>
              //         </Tooltip>
              //         <Tooltip title="Delete">
              //           <Avatar
              //             // onClick={() => handleDelete(row?.id)}
              //             variant="rounded"
              //             className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-700 !p-0"
              //             sx={{
              //               mr: '0.1vw',
              //               padding: '0px !important',
              //               backgroundColor: 'Highlight',
              //               cursor: 'pointer',
              //               color: '',
              //             }}
              //           >
              //             <Delete sx={{ padding: '0px !important' }} />
              //           </Avatar>
              //         </Tooltip>
              //         <Tooltip title="View Prescription">
              //           <Avatar
              //             // onClick={() => handleDelete(row?.id)}
              //             onClick={() =>
              //               router.push(`/admin/prescription/e-prescription`)
              //             }
              //             variant="rounded"
              //             className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-primary !p-0"
              //             sx={{
              //               mr: '0.1vw',
              //               padding: '0px !important',
              //               backgroundColor: 'Highlight',
              //               cursor: 'pointer',
              //               color: '',
              //             }}
              //           >
              //             <Visibility sx={{ padding: '0px !important' }} />
              //           </Avatar>
              //         </Tooltip>
              //       </div>
              //     </>
              //   ),
              // },
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
            //                 Prescription Note :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.city ? rowData.city : 'Not Provided'} */}{' '}
            //                   Lorem ipsum dolor sit amet consectetur adipisicing
            //                   elit. Exercitationem, officia?
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
                //   tooltip: 'Add Prescription',
                //   isFreeAction: true,
                //   onClick: () => {
                //     router.push('/admin/prescription/create-prescription')
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

export default PrescriptionHistory
