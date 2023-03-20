import EditInvoiceDrawer from 'components/admin/drawer/EditInvoiceDrawer'
import { BorderColor, Delete, ReceiptLong } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import { Avatar, Paper } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import CustomerType from 'types/customer'
import { useRouter } from 'next/router'
import AdminLayout from 'layouts/admin'
import { MuiTblOptions } from 'utils'
// import { database } from 'configs'
import { useState } from 'react'
import { useFetch } from 'hooks'
import Swal from 'sweetalert2'
import moment from 'moment'

const AllInvoices = () => {
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
    // try {
    //   database.ref(`Customers/${row?.id}`).remove()
    //   Swal.fire('Success', 'Successfully Deleted', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
  }

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      ownerName: 'Kate',
      pet: 'Dog',
      petName: 'Cooper',
      itemName: 'Ketoconazole',
      itemDescription: 'Lorem ipsum dolor sit.',
      subTotal: '₹1200/-',
      discount: '10%',
      grossTotal: '₹1080/-',
      depositedAmount: '₹1100/-',
    },
  ])

  return (
    <AdminLayout title="All Invoices">
      <div className="grid grid-cols-12 content-between gap-6  px-5">
        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          <EditInvoiceDrawer
            open={openEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
            // mutate={mutate}
          />
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="All Invoices" />}
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
                title: 'Pet Name',
                field: 'petName',
                editable: 'never',

                emptyValue: '--',

                // width: "2%",
              },

              {
                title: 'Item Name',
                field: 'itemName',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,

                filtering: false,
              },

              // {
              //   title: 'Item Description',
              //   field: 'itemDescription',
              //   searchable: true,

              //   emptyValue: '--',
              //   //   hidden:true,
              //   filtering: false,
              // },
              {
                title: 'Sub Total',
                field: 'subTotal',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Gross Total',
                field: 'grossTotal',
                searchable: true,
                export: true,
                emptyValue: '--',
                //   hidden:true,
                filtering: false,
              },
              {
                title: 'Deposited Amount',
                field: 'depositedAmount',
                searchable: true,
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
                      <Tooltip title="View Invoice">
                        <Avatar
                          // onClick={() => handleDelete(row?.id)}
                          onClick={() =>
                            router.push(`/admin/invoices/payment-invoice`)
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
                          <ReceiptLong sx={{ padding: '0px !important' }} />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
                ),
              },
            ]}
            // detailPanel={[
            //   {
            //     tooltip: 'info',
            //     icon: 'info',
            //     openIcon: 'visibility',
            //     render: ({ rowData }) => (
            //       <>
            //         <div
            //           style={{
            //             padding: '12px',
            //             margin: 'auto',
            //             backgroundColor: '#eef5f9',
            //           }}
            //         >
            //           <Card
            //             sx={{
            //               minWidth: 400,
            //               maxWidth: 450,
            //               transition: '0.3s',
            //               margin: 'auto',
            //               borderRadius: '10px',
            //               boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
            //               '&:hover': {
            //                 boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
            //               },
            //             }}
            //           >
            //             <CardContent>
            //               <Typography gutterBottom align="left">
            //                 Item Description :
            //                 <span
            //                   style={{
            //                     color: 'rgb(30, 136, 229)',
            //                     fontSize: '15px',
            //                     wordBreak: 'break-word',
            //                     wordWrap: 'break-word',
            //                   }}
            //                 >
            //                   {/* {rowData?.city ? rowData.city : 'Not Provided'} */}{' '}
            //                   Lorem ipsum dolor sit amet consectetur adipisicing
            //                   elit. Exercitationem, officia?
            //                 </span>
            //               </Typography>
            //             </CardContent>
            //           </Card>
            //         </div>
            //       </>
            //     ),
            //   },
            // ]}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add Invoice',
                isFreeAction: true,
                onClick: () => {
                  router.push('/admin/invoices/generate-invoice')
                },
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AllInvoices
