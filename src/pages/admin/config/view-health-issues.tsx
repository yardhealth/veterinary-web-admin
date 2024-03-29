import EditHealthIssuesDrawer from 'components/admin/drawer/EditHealthIssuesDrawer'
import { BorderColor, Delete } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useGET, useMutation } from 'hooks'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { BASE_URL } from 'configs'
import { useState } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment'

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

const ViewHealthIssues = () => {
  const { isMutating, trigger } = useMutation(`health-particular/getall`)
  const router = useRouter()
  const [activeData, setActiveData] = useState<any>()

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  console.log(openEditPrescriptionDrawer)
  const { data, mutate, isLoading } = useGET<any[]>(`health-particular/getall`)
  console.log(data)

  const handleClick = (Data: any) => {
    setOpenEditPrescriptionDrawer(true)
    setActiveData(Data)
  }

  const handleDelete = async (id: string) => {
    try {
      const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
      const res = await fetch(`${BASE_URL}/health-particular/delete/${id}`, {
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
  // useEffect(() => {
  //   if (!openEditPrescriptionDrawer) mutate?.()
  // }, [openEditPrescriptionDrawer])

  return (
    <AdminLayout title="View All Health Issues">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          {activeData?._id && (
            <EditHealthIssuesDrawer
              open={openEditPrescriptionDrawer}
              onClose={() => setOpenEditPrescriptionDrawer(false)}
              activeData={activeData}
              mutate={mutate}
            />
          )}
          <MaterialTable
            isLoading={isLoading}
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({
                    ..._,
                    sl: i + 1,
                    createdAt: moment(new Date(_?.createdAt)).format('lll'),
                  }))
                : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="View All Health Issues" />}
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
                title: 'Issue Category',
                field: 'healthIssue',
                editable: 'never',
                emptyValue: '--',
                // width: "2%",
              },
              {
                title: 'Issue Description',
                field: 'healthParticulars',
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
                      <Tooltip title="Edit">
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
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          // onClick={() => handleDelete(row?.id)}
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
            actions={[]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default ViewHealthIssues
