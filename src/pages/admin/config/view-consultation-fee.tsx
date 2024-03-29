import EditFeeDrawer from 'components/admin/drawer/EditFeeDrawer'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { BASE_URL } from 'configs'
import { useState } from 'react'
import { useGET } from 'hooks'
import Swal from 'sweetalert2'
import moment from 'moment'

const ViewConsultationFee = () => {
  const router = useRouter()
  const [activeData, setActiveData] = useState<any>()
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = () => setOpenInfoModal(true)
  const handleInfoCloseModal = () => setOpenInfoModal(false)

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  console.log(openEditPrescriptionDrawer)
  const { data, mutate } = useGET<any[]>(`payment/getall`)
  console.log(data)

  const handleClick = (Data: any) => {
    setOpenEditPrescriptionDrawer(true)
    setActiveData(Data)
  }

  const handleDelete = async (id: string) => {
    try {
      const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
      const res = await fetch(`${BASE_URL}/payment/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.message)
      Swal.fire('Deleted Successfully', 'Deleted', 'success')
      mutate?.()
    } catch (error) {}
  }

  return (
    <AdminLayout title="View Consultation Fees">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditFeeDrawer
            open={openEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
            activeData={activeData}
            mutate={mutate}
          />
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i: any) => ({
                    ..._,
                    sl: i + 1,
                    createdAt: moment(new Date(_?.createdAt)).format('lll'),
                  }))
                : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="View Consultation Fees" />}
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
                title: 'Consultation Type',
                field: 'label',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Service Charge',
                field: 'amount',
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
                      {/* <Tooltip title="View Reports">
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
                      </Tooltip> */}
                      {/* <Tooltip title="Edit">
                        <Avatar
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
                      </Tooltip> */}
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => handleDelete(row?._id)}
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

export default ViewConsultationFee
