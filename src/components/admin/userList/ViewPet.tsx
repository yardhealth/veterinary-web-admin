import BookAppointmentDrawer from '../drawer/BookAppointmentDrawer'
import EditPetDrawer from 'components/admin/drawer/EditPetDrawer'
import { BorderColor, Delete } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import AddPetDrawer from '../drawer/AddPetDrawer'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { BASE_URL } from 'configs'
import { useState } from 'react'
import { useGET } from 'hooks'
import Swal from 'sweetalert2'
import moment from 'moment'

const ViewPet = ({ rowData }: any) => {
  console.log(rowData)
  const router = useRouter()
  const [activeData, setActiveData] = useState<any>()
  const [openEditPetDrawer, setOpenEditPetDrawer] = useState(false)
  const [bookAppointmentDrawer, setBookAppointmentDrawer] = useState(false)
  const [addPetDrawer, setAddPetDrawer] = useState(false)

  const { data, mutate, isLoading } = useGET<any[]>(
    `appointment-booked-by-admin/admin-get-pet?userId=${rowData._id}`
  )
  console.log(data)

  // console.log(data)
  console.log(openEditPetDrawer)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleClick = (Data: any) => {
    setOpenEditPetDrawer(true)
    setActiveData(Data)
  }
  const handleAppointment = (Data: any) => {
    setBookAppointmentDrawer(true)
    setActiveData(Data)
  }

  const handleDelete = async (id: string) => {
    try {
      const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
      const res = await fetch(
        `${BASE_URL}/appointment-booked-by-admin/admin-delete-pet/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.message)
      Swal.fire('Deleted Successfully', 'Deleted', 'success')
      mutate?.()
    } catch (error) {}
  }

  return (
    <>
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditPetDrawer
            open={openEditPetDrawer}
            onClose={() => setOpenEditPetDrawer(false)}
            activeData={activeData}
            mutate={mutate}
          />

          <AddPetDrawer
            open={addPetDrawer}
            onClose={() => setAddPetDrawer(false)}
            activeData={activeData}
            mutate={mutate}
            _id={rowData?._id}
          />

          <BookAppointmentDrawer
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
                    createdAt: moment(new Date(_?.createdAt)).format('lll'),
                  }))
                : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Pets" />}
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
                title: 'Pet Category',
                field: 'petCategory',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Pet Name',
                field: 'petName',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Gender',
                field: 'gender',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Breed',
                field: 'breed',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Age (Years)',
                field: 'age',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Wt (kg)',
                field: 'weight',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Aggression',
                field: 'aggression',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Vaccinated',
                field: 'vaccinated',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Pet Image',
                field: 'petImage',
                render: ({ petImage }) => {
                  return (
                    <div>
                      <img className="rounded-md" src={petImage} alt="" />
                    </div>
                  )
                },
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
                title: 'Actions',
                cellStyle: {
                  textAlign: 'right',
                },
                export: true,
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Book Appointment">
                        <button
                          onClick={() => handleAppointment(row)}
                          className="!mr-0.5 !ml-0.5 !cursor-pointer rounded-md !bg-primary px-3 text-sm text-white"
                        >
                          Book Appointment
                        </button>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Avatar
                          // onClick={() => setOpenEditPetDrawer(true)}
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
            actions={[
              {
                icon: 'add',
                tooltip: 'Add New Pet',
                isFreeAction: true,
                onClick: () => setAddPetDrawer(true),
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ViewPet
