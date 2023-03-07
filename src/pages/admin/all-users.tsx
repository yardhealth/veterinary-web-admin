import { BorderColor, Cancel, CheckCircle, Delete } from '@mui/icons-material'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import HeadStyle from 'components/core/HeadStyle'
import AddCustomerDrawer from 'components/admin/drawer/AddCustomerDrawer'
import AddItemDrawer from 'components/admin/drawer/AddItemDrawer'
import Swal from 'sweetalert2'
import AdminType from 'types/admin'
import { useFetch } from 'hooks'
import moment from 'moment'
const AllUsers = () => {
  const router = useRouter()

  const gotoCreateUser = () => {
    router.push('./create-user')
  }

  const [data, isLoading] = useFetch<AdminType[]>(`/Users`, {
    needNested: false,
    needArray: true,
  })

  const onRowDelete = async (oldData: AdminType) => {
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbRef: `Users`, ...oldData }),
      })
      const result = await response.json()

      Swal.fire('Success', `User deleted successfully`, 'success')
      if (response.status !== 200)
        return Swal.fire('Error', `${result?.error?.message}`, 'error')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `Something Went Wrong`, 'error')
    }
  }
  const onRowUpdate = async (newData: AdminType) => {
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbRef: `Users`, ...newData }),
      })
      const result = await response.json()

      Swal.fire('Success', `User updated successfully`, 'success')
      if (response.status !== 200)
        return Swal.fire('Error', `${result?.error?.message}`, 'error')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `Something Went Wrong`, 'error')
    }
  }
  return (
    <AdminLayout title="All users">
      <div className=" mx-8 grid grid-cols-12  content-between gap-6 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <MaterialTable
            isLoading={isLoading}
            data={
              data === null
                ? []
                : data
                    ?.slice()
                    .sort(
                      (a: any, b: any) =>
                        (new Date(b?.createdAt) as any) -
                        (new Date(a?.createdAt) as any)
                    )
                    ?.filter((item) => item?.role !== 'admin')
                    .map((_: any, i: number) => ({
                      ..._,
                      sl: i + 1,
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Staffs" />}
            options={{
              ...MuiTblOptions(),

              sorting: true,
            }}
            // editable={{
            // 	onRowAdd: (newRow) => new Promise(() => {}),
            // }}
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
                field: 'displayName',
                searchable: true,

                // width: "2%",
              },
              {
                title: 'email',
                field: 'email',
                searchable: true,
              },

              {
                title: 'Password',
                field: 'password',

                //   hidden:true,
              },
              {
                title: 'Role',
                field: 'role',
                searchable: true,
                lookup: {
                  manager: 'Manager',
                  'sales-person': 'Sales Person',
                },
                editable: 'never',
              },
              {
                title: 'Created At',
                editable: 'never',
                field: 'createdAt',
                render: ({ createdAt }: any) =>
                  moment(new Date(createdAt)).format('lll'),
              },

              // {
              // 	title: "View Details",
              // 	field: "view",
              // 	emptyValue: "Not Login Yet",
              // 	render: ({ lastLogin }: any) => lastLogin,
              // 	? dayjs(new Date(lastLogin)).format("lll")
              // 	: "Not Login Yet",
              // },
            ]}
            editable={{ onRowUpdate, onRowDelete }}
            actions={[
              // {
              // 	icon: "upload_file",
              // 	tooltip: "Import Data",
              // 	isFreeAction: true,
              // 	onClick: () => {
              // 		// setOpenAddHolidayDrawer(true);
              // 	},
              // },
              {
                icon: 'add',
                tooltip: 'Create User',
                isFreeAction: true,
                onClick: () => {
                  gotoCreateUser()
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllUsers
