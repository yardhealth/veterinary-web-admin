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
import moment from 'moment'
import { useFetch } from 'hooks'
import ItemType from 'types/item'
import { formatCurrency } from '@ashirbad/js-core'
import Swal from 'sweetalert2'
// import { database } from 'configs'

const Items = () => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<any>({
    dialogOpen: false,
    cardRoute: '',
    highlightText: '',
    animationData: '',
  })

  const [openAddItemDrawer, setOpenAddItemDrawer] = useState(false)

  const [data, isLoading] = useFetch<ItemType[]>(`/Items`, {
    needNested: false,
    needArray: true,
  })
  // console.log(data)
  const onRowDelete = async (oldData: ItemType) => {
    // try {
    //   database.ref(`Items/${oldData?.id}`).remove()
    //   Swal.fire('Success', 'Successfully Deleted', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
  }
  const onRowUpdate = async (newData: ItemType, oldData: ItemType) => {
    // try {
    //   database
    //     .ref(`Items/${oldData?.id}`)
    //     .update({ ...newData, updatedAt: new Date().toString() })
    //   Swal.fire('Success', 'Successfully Deleted', 'success')
    // } catch (error) {
    //   console.log(error)
    //   Swal.fire('Error', `Something Went Wrong`, 'error')
    // }
  }
  return (
    <AdminLayout title="Items">
      <div className="grid grid-cols-12 content-between  gap-6 px-4 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <AddItemDrawer
            open={openAddItemDrawer}
            onClose={() => setOpenAddItemDrawer(false)}
            // mutate={mutate}
          />
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
                    .map((_: any, i: number) => ({
                      ..._,
                      sl: i + 1,
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Items" />}
            options={{
              ...MuiTblOptions(),
              // selection: true,
              // filtering: true,
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
                title: 'Item Name',
                field: 'itemName',
                emptyValue: 'Not Provided',
                searchable: true,
                filtering: false,
                // width: "2%",
              },
              {
                title: 'Type',
                field: 'type',
                emptyValue: 'Not Provided',
                searchable: true,
                filtering: false,
                lookup: {
                  Goods: 'Goods',
                  Services: 'Services',
                },
                // width: "2%",
              },
              {
                title: 'Description',
                field: 'description',
                filtering: false,
                emptyValue: 'Not Provided',
                searchable: true,
              },

              {
                title: 'Rate',
                field: 'sellingPrice',
                searchable: true,
                export: true,
                emptyValue: 'Not Provided',
                filtering: false,
                render: ({ sellingPrice }) => formatCurrency(sellingPrice),

                //   hidden:true,
              },

              {
                title: 'Usage Unit',
                field: 'unit',
                searchable: true,
                export: true,
                emptyValue: 'Not Provided',
                filtering: false,
                lookup: {
                  Box: 'Box',
                  cm: 'cm',
                  dz: 'dz',
                  ft: 'ft',
                  g: 'g',
                  in: 'in',
                  kg: 'kg',
                  km: 'km',
                  lb: 'lb',
                  mg: 'mg',
                  ml: 'ml',
                  m: 'm',
                  pcs: 'pcs',
                },
              },
              {
                title: 'Created At',
                editable: 'never',
                field: 'createdAt',
                filtering: false,
                render: ({ createdAt }: any) =>
                  moment(new Date(createdAt)).format('LLL'),
              },
              // {
              //   title: 'Actions',
              //   cellStyle: {
              //     textAlign: 'right',
              //   },
              //   export: false,
              //   // width: "18%",
              //   // field: "pick",
              //   render: (row) => (
              //     <>
              //       <div className="flex">
              //         <Tooltip title="Edit">
              //           <Avatar
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
              //       </div>
              //     </>
              //   ),
              // },
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
                tooltip: 'Add Item',
                isFreeAction: true,
                onClick: () => {
                  setOpenAddItemDrawer(true)
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Items
