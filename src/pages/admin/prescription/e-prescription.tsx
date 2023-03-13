import AddNewPatientSchemas from 'schemas/AddNewPatientSchemas'
import { Download, Print } from '@mui/icons-material'
import HeadStyle from 'components/core/HeadStyle'
import MaterialTable from '@material-table/core'
import AdminLayout from 'layouts/admin'
import { MuiTblOptions } from 'utils'
import { useState } from 'react'
import { Box, Card, Container, Paper, Tooltip, Typography } from '@mui/material'

const EPrescription = () => {
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
      patientId: 'BS40',
      drug: 'Azithromycin',
      strength: '500mg',
      instruction: 'Once a Day',
      // frequency: "4 days",
      time: 'Before Meal',
      duration: '4 days',
    },
  ])

  return (
    <AdminLayout title="e-prescription">
      <Container
        className="flex gap-2"
        maxWidth="xl"
        // style={{
        //   width: '40vw',
        //   marginTop: '5vh',
        // }}
      >
        <Card className="dashboard-card-shadow w-[80%] border-t-4 border-b-4 border-t-primary border-b-primary  !p-6">
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
            Prescription
          </Box>
          <div className="my-5 grid grid-cols-12 gap-3">
            <div className="col-span-6 font-semibold">
              Owner Name : <span className="font-normal">Kate</span>
            </div>
            <div className="col-span-6 font-semibold">
              Pet : <span className="font-normal">Dog</span>
            </div>
            <div className="col-span-6 font-bold">
              Date : <span className="font-normal">06-02-2023</span>
            </div>
            <div className="col-span-6 font-bold">
              Prescribed By : <span className="font-normal"></span>
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
                          Drug Name
                        </th>
                        {/* <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Drug Strength
                        </th> */}
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Instruction
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Time
                        </th>
                        {/* <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          Duration
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-2 border-gray-400">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          Ketoconazole
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          500mg
                        </td> */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          Once a day
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          After meal
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          4 Days
                        </td> */}
                      </tr>
                      <tr className="border-2 border-gray-400 bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black"></td>
                      </tr>
                      <tr className="border-2 border-gray-400 bg-white">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
                          3
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex border border-y-gray-400 p-5 font-bold">
            <p>Prescription Notes:</p>
            <span className="pl-3 font-medium ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              eveniet deserunt rem ut aut repudiandae, provident amet
              necessitatibus quae voluptatibus recusandae suscipit dolorum sit,
              nam atque adipisci sapiente magnam accusantium?
            </span>
          </div>
        </Card>
        <div className="mt-10 w-[30%] space-x-4">
          <Tooltip title="Print">
            <button className="rounded-md bg-theme px-8 py-2 text-white">
              Print <Print />
            </button>
          </Tooltip>
          <Tooltip title="Download">
            <button className="rounded-md bg-theme px-8 py-2 text-white">
              Download <Download />
            </button>
          </Tooltip>
        </div>
      </Container>
    </AdminLayout>
  )
}

export default EPrescription
