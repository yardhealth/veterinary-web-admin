import EditUploadReportDrawer from 'components/admin/drawer/EditUploadReportDrawer'
import { Avatar, Box, Paper } from '@mui/material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import Tooltip from '@mui/material/Tooltip'
import CustomerType from 'types/customer'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal'
import { MuiTblOptions } from 'utils'
import { database } from 'configs'
import { useState } from 'react'
import { useFetch } from 'hooks'
import Swal from 'sweetalert2'
import moment from 'moment'
import {
  BorderColor,
  Delete,
  Download,
  Receipt,
  Visibility,
} from '@mui/icons-material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGap: '4px',
}

const ViewAllReports = () => {
  const router = useRouter()

  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = () => setOpenInfoModal(true)
  const handleInfoCloseModal = () => setOpenInfoModal(false)

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  const [data, isLoading] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  // console.log(data)
  console.log(openEditPrescriptionDrawer)
  const handleDelete = (row: CustomerType) => {
    try {
      database.ref(`Customers/${row?.id}`).remove()
      Swal.fire('Success', 'Successfully Deleted', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    }
  }

  const [tabelData, setTabelData] = useState([
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
    <AdminLayout title="View All Reports">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <Modal
            open={openInfoModal}
            onClose={handleInfoCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="gap-3" sx={style}>
              <div className="flex w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-gray-400 p-3">
                <img src="/file.png" alt="" />
                <div className="flex items-center justify-center gap-2">
                  <Tooltip title="View">
                    <Visibility />
                  </Tooltip>
                  <Tooltip title="Download">
                    <Download />
                  </Tooltip>
                </div>
              </div>
              <div className="flex w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-gray-400 p-3">
                <img src="/file.png" alt="" />
                <div className="flex items-center justify-center gap-2">
                  <Tooltip title="View">
                    <Visibility />
                  </Tooltip>
                  <Tooltip title="Download">
                    <Download />
                  </Tooltip>
                </div>
              </div>
            </Box>
          </Modal>
          <EditUploadReportDrawer
            open={openEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="View All Reports" />}
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
                      <Tooltip title="View Reports">
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
                          <Receipt sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          onClick={() => setOpenEditPrescriptionDrawer(true)}
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

export default ViewAllReports
