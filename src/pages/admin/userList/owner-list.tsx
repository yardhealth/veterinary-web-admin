import EditScheduleDrawer from 'components/admin/drawer/EditScheduleDrawer'
import { BorderColor, Delete } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Avatar, Card, CardContent, Paper, Typography } from '@mui/material'
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
import EditOwnerDrawer from 'components/admin/drawer/EditOwnerDrawer'
import { BASE_URL } from 'configs'
import ViewPet from 'components/admin/userList/ViewPet'

const OwnerList = () => {
  const router = useRouter()
  const [activeData, setActiveData] = useState<any>()
  console.log(activeData)

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false)

  const { data, mutate, isLoading } = useGET<any[]>(`user/getall?role=USER`)
  console.log(data)

  const {
    data: addressData,
    mutate: addressMutate,
    isLoading: addressLoading,
  } = useGET<any[]>(`address/address-admin?userId=6409bf44ffba39a214d4a003`)
  console.log(addressData)

  // console.log(data)
  console.log(openEditPrescriptionDrawer)

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
  const [userId, setUserId] = useState()
  console.log(userId)

  const handleClick = (Data: any) => {
    setOpenEditPrescriptionDrawer(true)
    setActiveData(Data)
  }

  const handleDelete = async (id: string) => {
    try {
      const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
      const res = await fetch(`${BASE_URL}/user/delete/${id}`, {
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
    <AdminLayout title="All Users">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          {activeData?._id && (
            <EditOwnerDrawer
              open={openEditPrescriptionDrawer}
              onClose={() => setOpenEditPrescriptionDrawer(false)}
              activeData={activeData}
              mutate={mutate}
            />
          )}
          <MaterialTable
            data={
              data?.success?.data
                ? data?.success?.data?.map((_, i) => ({
                    ..._,
                    sl: i + 1,
                    createdAt: moment(new Date(_?.createdAt)).format('LL'),
                  }))
                : []
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Owners" />}
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
                title: 'Name',
                field: 'name',
                editable: 'never',
                emptyValue: '--',
              },
              {
                title: 'Email',
                field: 'email',
                editable: 'never',
                emptyValue: '--',
              },

              {
                title: 'Phone Number',
                field: 'phoneNumber',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,
              },
              // {
              //   title: 'House Number',
              //   field: 'phoneNumber',
              //   searchable: true,
              //   export: true,
              //   emptyValue: '--',
              //   //   hidden:true,
              // },
              // {
              //   title: 'Apartment Number',
              //   field: 'phoneNumber',
              //   searchable: true,
              //   export: true,
              //   emptyValue: '--',
              //   //   hidden:true,
              // },
              // {
              //   title: 'Zip code',
              //   field: 'phoneNumber',
              //   searchable: true,
              //   export: true,
              //   emptyValue: '--',
              //   //   hidden:true,
              // },
              // {
              //   title: 'City',
              //   field: 'phoneNumber',
              //   searchable: true,
              //   export: true,
              //   emptyValue: '--',
              //   //   hidden:true,
              // },
              // {
              //   title: 'State',
              //   field: 'phoneNumber',
              //   searchable: true,
              //   export: true,
              //   emptyValue: '--',
              //   //   hidden:true,
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
                render: (row) => (
                  <>
                    <div className="flex">
                      <Tooltip title="Edit">
                        <Avatar
                          // onClick={() => setOpenEditPrescriptionDrawer(true)}
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
            detailPanel={[
              {
                tooltip: 'info',
                icon: 'info',
                openIcon: 'visibility',
                render: ({ rowData }) => (
                  <>
                    <div
                      style={{
                        padding: '12px',
                        margin: 'auto',
                        backgroundColor: '#eef5f9',
                      }}
                    >
                      <ViewPet rowData={rowData} />
                    </div>
                  </>
                ),
              },
            ]}
            actions={
              [
                // {
                //   icon: 'add',
                //   tooltip: 'Add Schedule',
                //   isFreeAction: true,
                //   onClick: () => {
                //     router.push('/admin/schedule/create-schedule')
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

export default OwnerList
