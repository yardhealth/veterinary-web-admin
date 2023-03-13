import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import { BorderColor, Delete, Visibility } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Avatar, Card, CardContent, Paper, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { useFetch } from 'hooks'
import CustomerType from 'types/customer'
import moment from 'moment'
import { database } from 'configs'
import Swal from 'sweetalert2'
import { formatCurrency, getArrFromObj } from '@ashirbad/js-core'
import EditUpcomingAppointmentDrawer from 'components/admin/drawer/EditUpcomingAppointmentDrawer'
import Status from 'components/core/Status'
import EditScheduleDrawer from 'components/admin/drawer/EditScheduleDrawer'
import EditPrescriptionDrawer from 'components/admin/drawer/EditPrescriptionDrawer'

const AllPrescription = () => {
  const router = useRouter()

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

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      ownerName: 'Kate',
      pet: 'Dog',
      drugName: 'Ketoconazole',
      instruction: 'once a day',
      time: 'After meal',
      prescriptionNote: 'Lorem ipsum dolor sit.',
    },
  ])

  return (
    <AdminLayout title="All Schedules">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditPrescriptionDrawer
            open={openEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Schedules" />}
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
                title: 'Drug Name',
                field: 'drugName',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,

                filtering: false,
              },

              {
                title: 'Instruction',
                field: 'instruction',
                searchable: true,

                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Time',
                field: 'time',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
                export: true,
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Prescription Note',
                field: 'prescriptionNote',
                searchable: true,
                cellStyle: {
                  textAlign: 'center',
                },
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
                      <Tooltip title="View Prescription">
                        <Avatar
                          // onClick={() => handleDelete(row?.id)}
                          onClick={() =>
                            router.push(`/admin/prescription/e-prescription`)
                          }
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-primary !p-0"
                          sx={{
                            mr: '0.1vw',
                            padding: '0px !important',
                            backgroundColor: 'Highlight',
                            cursor: 'pointer',
                            color: '',
                          }}
                        >
                          <Visibility sx={{ padding: '0px !important' }} />
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
                tooltip: 'Add Prescription',
                isFreeAction: true,
                onClick: () => {
                  router.push('/admin/prescription/create-prescription')
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllPrescription
