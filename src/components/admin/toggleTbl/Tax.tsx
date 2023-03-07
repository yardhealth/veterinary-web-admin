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

const Tax = () => {
  const router = useRouter()

  const [tabelData, setTabelData] = useState([
    {
      sl: '1',
      date: '28/01/2000',
      receivedPayment: '30000',
      ordernumber: '6568986565',
      customername: 'Demo Name',
      status: 'Active',
      duedate: '18/01/2022',
      amount: '20000',
      balancedue: '300000',
    },
  ])

  return (
    <div className="m-5 !mb-6 grid grid-cols-12  content-between gap-6 ">
      <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
        <MaterialTable
          data={tabelData}
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={<HeadStyle name="Payment Info" />}
          options={{
            ...MuiTblOptions(),
            selection: true,
            filtering: true,
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
              title: 'Date',
              field: 'date',
              editable: 'never',
              searchable: true,
              filtering: false,
              // width: "2%",
            },
            {
              title: 'Invoice Number',
              field: 'invoiceNumber',
              editable: 'never',
              headerStyle: {
                textAlign: 'center',
              },
              // width: "2%",
              searchable: true,
              filtering: false,
            },

            {
              title: 'Invoice Amount',
              field: 'invoiceAmount',
              searchable: true,
              filtering: false,
              export: true,
              emptyValue: 'Not Provided',
              //   hidden:true,
            },

            {
              title: 'Amount Due',
              field: 'amountDue',
              searchable: true,
              filtering: false,
              export: true,
              emptyValue: 'Not Provided',
              //   hidden:true,
            },
            {
              title: 'withholdingTax',
              field: 'Withholding Tax',
              searchable: true,
              filtering: false,
              export: true,
              emptyValue: 'Not Provided',
              //   hidden:true,
            },
            {
              title: 'Payment',
              field: 'payment',
              headerStyle: {
                textAlign: 'center',
              },
              cellStyle: {
                textAlign: 'center',
              },
              searchable: true,
              filtering: false,
              export: true,
              emptyValue: 'Not Provided',
              //   hidden:true,
            },
          ]}
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
              tooltip: 'Add Leave',
              isFreeAction: true,
              onClick: () => {
                // gotoAddInvoice()
              },
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Tax
