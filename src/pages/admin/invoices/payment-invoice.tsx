import AddNewPatientSchemas from 'schemas/AddNewPatientSchemas'
import { Box, Card, Tooltip, Typography } from '@mui/material'
import { Download, Print } from '@mui/icons-material'
import AdminLayout from 'layouts/admin'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'

const PaymentInvoice = () => {
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const handleSend = async (values: any, submitProps: any) => {
    const formData = new FormData()
    formData.append('title', values?.title)
    formData.append('description', values?.description)
    image?.target?.files[0] && formData.append('image', image?.target?.files[0])
  }
  const initialValues = {
    title: '',
    description: '',
    clinicName: 'Select clinic',
  }
  const validationSchema = AddNewPatientSchemas?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  const [tabelData, settabelData] = useState([
    {
      slNo: '1',
      code: 'B004',
      description: 'ECG',
      unitPrice: '1000',
      qty: '1',
      amount: '1000',
    },
  ])

  return (
    <AdminLayout title="Payment Invoice">
      <div
        className="flex w-full justify-evenly gap-1"
        // maxWidth="xl"
        // style={{
        //   width: '40vw',
        //   marginTop: '5vh',
        // }}
      >
        <Card className=" dashboard-card-shadow w-3/5 border-t-4 border-b-4 border-t-theme border-b-theme  !p-6">
          <Box className="shadow-md mb-5 flex justify-between shadow-slate-200">
            <Typography
              align="left"
              // color="text.primary"
              variant="h5"
              className="!mt-2 px-5 font-bold text-theme"
              sx={{ marginBottom: 3 }}
            >
              Hospital
              <div className="text-[1rem] font-medium text-black">
                Ka, 3/I, Bashundhara Main Road
              </div>
              <div className="text-[1rem] font-medium text-black">
                Tel: 546484489
              </div>
            </Typography>
            <Typography align="right">
              <img className="" src="/veterinaryLogo.png" alt="logo" />
            </Typography>
          </Box>
          <Box className="flex h-20 items-center justify-center border border-gray-200 text-2xl font-bold">
            PAYMENT INVOICE
          </Box>
          <div className="my-5 grid grid-cols-12 gap-3">
            <div className="col-span-6 font-semibold">
              Owner Name : <span className="font-normal">Kate</span>
            </div>
            <div className="col-span-6 font-semibold">
              Pet : <span className="font-normal">Dog</span>
            </div>
            <div className="col-span-6 font-semibold">
              Pet Name : <span className="font-normal">Cooper</span>
            </div>
            <div className="col-span-6 font-bold">
              Date : <span className="font-normal">31-01-2023</span>
            </div>
            <div className="col-span-6 font-bold">
              Item Name : <span className="font-normal">Ketoconazole</span>
            </div>
            <div className="col-span-6 font-bold">
              Doctor : <span className="font-normal">Dr. Anshuman</span>
            </div>
            <div className="col-span-6 font-bold">
              Phone : <span className="font-normal"></span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-2 border-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Sl.No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Item Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Item Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Sub Total(₹)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Discount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Gross Total(₹)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Deposited Amount(₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-2 border-gray-400">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black">
                          Ketoconazole
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black">
                          Lorem ipsum dolor sit.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black">
                          ₹1200/-
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black">
                          10%
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black">
                          ₹1080/-
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black">
                          ₹1100/-
                        </td>
                      </tr>
                      <tr className="border-2 border-gray-400 bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black"></td>
                      </tr>
                      <tr className="border-2 border-gray-400 bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          3
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-black"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-1 w-1/5 space-x-1">
          <Tooltip title="Print">
            <button className="rounded-md bg-theme px-2 py-2 text-white">
              Print <Print />
            </button>
          </Tooltip>
          <Tooltip title="Download">
            <button className="rounded-md bg-theme px-2 py-2 text-white">
              Download <Download />
            </button>
          </Tooltip>
        </div>
      </div>
    </AdminLayout>
  )
}

export default PaymentInvoice
