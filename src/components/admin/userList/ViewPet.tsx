import EditScheduleDrawer from 'components/admin/drawer/EditScheduleDrawer'
import { Add, AddCircle, BorderColor, Delete } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import CustomerType from 'types/customer'
import { useRouter } from 'next/router'
import AdminLayout from 'layouts/admin'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { useFetch, useGET, useMutation } from 'hooks'
import moment from 'moment'
// import { database } from 'configs'
import Swal from 'sweetalert2'
import EditPetDrawer from 'components/admin/drawer/EditPetDrawer'
import { BASE_URL } from 'configs'
import Modal from '@mui/material/Modal'
import AddPet from './AddPet'
import BookAppointmentDrawer from '../drawer/BookAppointmentDrawer'
import AddPetDrawer from '../drawer/AddPetDrawer'

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

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      day: 'mon',
      startTime: '10:00',
      endTime: '18:00',
      breakTime: '13:00',
      intervalPeriod: '1 hr',
      slotDuration: '15',
      slotGap: '5',
      createdAt: 'March 2, 2023 3:57 PM',
    },
  ])

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

          {activeData?._id && (
            <BookAppointmentDrawer
              open={bookAppointmentDrawer}
              onClose={() => setBookAppointmentDrawer(false)}
              activeData={activeData}
              mutate={mutate}
            />
          )}
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({ ..._, sl: i + 1 }))
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
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Book Appointment">
                        <button
                          // onClick={() => setOpenEditPetDrawer(true)}
                          onClick={() => handleAppointment(row)}
                          // variant="rounded"
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
