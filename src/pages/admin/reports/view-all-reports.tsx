import EditUploadReportDrawer from 'components/admin/drawer/EditFeeDrawer'
import { Avatar, Box, Paper } from '@mui/material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
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

const ViewAllReports = () => {
  const router = useRouter()

  const [openInfoModal, setOpenInfoModal] = useState(false)
  const handleInfoOpen = () => setOpenInfoModal(true)
  const handleInfoCloseModal = () => setOpenInfoModal(false)

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  const { data, mutate } = useGET<any[]>(`report/getall`)
  // console.log(data)

  const handleDelete = async (id: string) => {
    try {
      const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
      const res = await fetch(`${BASE_URL}/report/delete/${id}`, {
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
    <AdminLayout title="View All Reports">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditUploadReportDrawer
            open={openEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({
                    ..._,
                    sl: i + 1,
                    user: _?.user?.name,
                    petName: _?.pet?.petName,
                    petCategory: _?.pet?.petCategory,
                    createdAt: moment(new Date(_?.createdAt)).format('LL'),
                  }))
                : []
            }
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
                field: 'user',
                editable: 'never',
                emptyValue: '--',
                render: ({ user }) => {
                  return user
                },
                // width: "2%",
              },

              {
                title: 'Pet Name',
                field: 'petName',
                editable: 'never',
                emptyValue: '--',
                render: ({ petName }) => {
                  return petName
                },
                // width: "2%",
              },
              {
                title: 'Pet Category',
                field: 'petCategory',
                editable: 'never',
                emptyValue: '--',
                render: ({ petCategory }) => {
                  return petCategory
                },
                // width: "2%",
              },
              {
                title: 'View Report',
                field: 'reportPhoto',
                editable: 'never',
                render: ({ reportPhoto }) => {
                  return (
                    <div>
                      <a target="_blank" href={reportPhoto}>
                        <img className="w-20" src="/report.png" alt="" />
                      </a>
                    </div>
                  )
                },
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

export default ViewAllReports
