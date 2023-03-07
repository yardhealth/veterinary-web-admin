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
import moment from 'moment'
import EditInVoiceDrawer from 'components/admin/invoice/EditInvoice'
import { useFetch } from 'hooks'
import { database } from 'configs'
import Swal from 'sweetalert2'

const TcsTaxes = () => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<any>({
    dialogOpen: false,
    cardRoute: '',
    highlightText: '',
    animationData: '',
  })

  const [openAddCustomerDrawer, setOpenAddCustomerDrawer] = useState(false)

  const gotoAddInvoice = () => {
    router.push('./addTcs')
  }

  const [tabelData, setTabelData] = useState([
    {
      sl: '1',
      date: '28/01/2000',
      invoice: '8986567656',
      ordernumber: '6568986565',
      customername: 'Demo Name',
      status: 'Active',
      duedate: '18/01/2022',
      amount: '20000',
      balancedue: '300000',

      // details: <LeaveViewDetails title={""} />,
    },
    // {
    //   sl: '2',
    //   doctor: 'Gargi Pattnaik',
    //   leaveDate: '08-01-2023',
    //   specialization: '',
    //   // details: <LeaveViewDetails title={""} />,
    // },
    // {
    //   sl: '3',
    //   doctor: 'Rajeev Jena',
    //   leaveDate: '07-02-2023',
    //   specialization: '',
    //   // details: <LeaveViewDetails title={""} />,
    // },
    // {
    //   sl: '4',
    //   doctor: 'Laxmidhar Panda',
    //   leaveDate: '26-02-2023',
    //   specialization: '',
    //   // details: <LeaveViewDetails title={""} />,
    // },
    // {
    //   sl: '5',
    //   doctor: 'Pravat Das',
    //   leaveDate: '15-01-2023',
    //   specialization: '',
    //   // details: <LeaveViewDetails title={""} />,
    // },
    // {
    //   sl: '6',
    //   doctor: 'Suvendu Mohanty',
    //   leaveDate: '10-01-2023',
    //   specialization: '',
    //   // details: <LeaveViewDetails title={""} />,
    // },
  ])

  const [openAddItemDrawer, setOpenAddItemDrawer] = useState(false)
  const [data, isLoading] = useFetch<any[]>(`/Taxes`, {
    needNested: false,
    needArray: true,
  })
  const onRowDelete = async (oldData: any) => {
    try {
      database.ref(`Taxes/${oldData?.id}`).remove()
      Swal.fire('Success', 'Successfully Deleted', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    }
  }
  const onRowUpdate = async (newData: any, oldData: any) => {
    try {
      database
        .ref(`Taxes/${oldData?.id}`)
        .update({ ...newData, updatedAt: new Date().toString() })
      Swal.fire('Success', 'Successfully Deleted', 'success')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `Something Went Wrong`, 'error')
    }
  }
  return (
    <AdminLayout title="Admin-Taxes">
      <div className="grid grid-cols-12 content-between  gap-6 px-5 ">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <AddCustomerDrawer
            open={openAddCustomerDrawer}
            onClose={() => setOpenAddCustomerDrawer(false)}
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
                      companyType: _?.companyName
                        ? _?.companyName
                        : 'Indivisual',
                    }))
            }
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Taxes" />}
            options={{
              ...MuiTblOptions(),
              // selection: true,
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
                title: 'Tax Name',
                field: 'taxName',
                searchable: true,
                filtering: false,
                lookup: {
                  '206C(6CA) - Alcoholic liquor for human consumption':
                    '206C(6CA) - Alcoholic liquor for human consumption',
                  '206C(6CB) - Timber obtained forest lease':
                    '206C(6CB) - Timber obtained forest lease',
                  '206C(6CC) - Timber obtained by any mode other than forest lease':
                    '206C(6CC) - Timber obtained by any mode other than forest lease',
                  '206C(6CD) - Any other forest produce (not being tendu leaves)':
                    '206C(6CD) - Any other forest produce (not being tendu leaves)',
                  '206C(6CF) Parking lots': '206C(6CF) Parking lots',
                  '206C(6CG) Toll plaza': '206C(6CG) Toll plaza',
                  '206C(6CH) Mine or quarry': '206C(6CH) Mine or quarry',
                  '206C(6CI) Tendu leaves': '206C(6CI) Tendu leaves',
                  '206C(6CJ) - Sales of minerals, being coal or lignite or iron core':
                    '206C(6CJ) - Sales of minerals, being coal or lignite or iron core',
                  '206C(6CK) - Cash sale of bullion and jewellery':
                    '206C(6CK) - Cash sale of bullion and jewellery',
                  '206C(6CL) - Sale of motor vehicle':
                    '206C(6CL) - Sale of motor vehicle',
                  '206C(6CO) - Purchase of overseas tour program package':
                    '206C(6CO) - Purchase of overseas tour program package',
                  '206C(6CP) - Education loan taken from financial institution mentioned in section 80E':
                    '206C(6CP) - Education loan taken from financial institution mentioned in section 80E',
                  '206C(6CQ) - Remittance under LRS for purpose other than for purpose of overseas tour package or for educational loan taken from financial institution':
                    '206C(6CQ) - Remittance under LRS for purpose other than for purpose of overseas tour package or for educational loan taken from financial institution',
                  '206C(1H) - Sale of goods': '206C(1H) - Sale of goods',
                },
                emptyValue: 'Not Provided',
                // width: "2%",
              },
              {
                title: 'Rate(%)',
                field: 'rate',
                headerStyle: {
                  textAlign: 'center',
                },
                // width: "2%",
                searchable: true,
                filtering: false,
                emptyValue: 'Not Provided',
              },

              {
                title: 'Nature Of Collection',
                field: 'natureOfCollection',
                searchable: true,
                filtering: false,
                export: true,
                emptyValue: 'Not Provided',
                //   hidden:true,
              },
              {
                title: 'Created At',
                editable: 'never',
                field: 'createdAt',
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
              //             onClick={() => setOpenAddItemDrawer(true)}
              //           >
              //             <BorderColor sx={{ padding: '0px !important' }} />
              //           </Avatar>
              //         </Tooltip>

              //         <EditInVoiceDrawer
              //           open={openAddItemDrawer}
              //           onClose={() => setOpenAddItemDrawer(false)}
              //         />
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
                tooltip: 'Add Invoice',
                isFreeAction: true,
                onClick: () => {
                  gotoAddInvoice()
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default TcsTaxes
