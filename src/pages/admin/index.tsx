// import MonthlyPaitentGraph from "components/analytics/MonthlyPaitentGraph";
// import IncomeVsExpence from "components/analytics/IncomeVsExpence";
// import InfoCards from "components/admin/InfoCards";
import { FaStethoscope } from 'react-icons/fa'
import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  PermContactCalendar,
  CurrencyRupee,
  LocalHotel,
  Medication,
  Apartment,
  Article,
  Science,
  AirlineSeatFlat,
} from '@mui/icons-material'
import InfoCards from 'components/core/InfoCards'
// import ViewDetailsBtn from "components/core/ViewDetailsBtn";

const Dashboard = () => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<any>({
    dialogOpen: false,
    cardRoute: '',
    highlightText: '',
    animationData: '',
  })

  const [tabelData, settabelData] = useState([
    {
      sl: '1',
      name: 'Raj',
      phone: '65758',
      email: 'swainsangeeta88@gmail.com',
      status: 'Pending',
      // view: <ViewDetailsBtn title={"View Details"} />,
    },
    {
      sl: '2',
      name: 'Sarat',
      phone: '65758',
      email: 'swainsangeeta88@gmail.com',
      status: 'Pending',
      // view: <ViewDetailsBtn title={"View Details"} />,
    },
    {
      sl: '3',
      name: 'priti',
      phone: '65758',
      email: 'swainsangeeta88@gmail.com',
      status: 'Settled',
      // view: <ViewDetailsBtn title={"View Details"} />,
    },
    {
      sl: '4',
      name: 'vikash',
      phone: '65758',
      email: 'swainsangeeta88@gmail.com',
      status: 'Settled',
      // view: <ViewDetailsBtn title={"View Details"} />,
    },
    {
      sl: '5',
      name: 'ssa',
      phone: '65758',
      email: 'swainsangeeta88@gmail.com',
      status: 'Settled',
      // view: <ViewDetailsBtn title={"View Details"} />,
    },
    {
      sl: '6',
      name: 'ssa',
      phone: '65758',
      email: 'swainsangeeta88@gmail.com',
      status: 'Settled',
      // view: <ViewDetailsBtn title={"View Details"} />,
    },
  ])

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="m-5 !mb-6 grid grid-cols-12  content-between gap-6 ">
        <InfoCards
          title="Doctors"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'40'}
          titleClassName="text-slate-600 font-bold text-base"
          contentClassName="text-black font-bold"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            <FaStethoscope className="h-7 w-7 rounded-md text-[#913d83]  group-hover:text-white" />
          }
          clickableRoute="/panel/admin/doctor/doctor-dashboard"
        />
        <InfoCards
          title="Patients"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'150'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <LocalHotel className=" h-7 w-7 rounded-md text-[#913d83] group-hover:text-white " />
          }
          clickableRoute="/panel/admin/patient/patient-dashboard"
        />
        <InfoCards
          title="Clinics"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'10'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <Apartment className="h-7 w-7 rounded-md text-[#913d83] group-hover:text-white " />
          }
          clickableRoute="/panel/admin/clinics/clinic-dashboard"
        />
        <InfoCards
          title="Appointments"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'170'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <PermContactCalendar className="h-7 w-7 rounded-md text-[#913d83] group-hover:text-white " />
          }
          clickableRoute="/panel/admin/appointments/appointments-dashboard"
        />
        <InfoCards
          title="Users"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'80'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <Article className="h-7 w-7 rounded-md text-[#913d83]  group-hover:text-white" />
          }
          clickableRoute="/panel/admin/users/user-dashboard"
        />
        <InfoCards
          title="Bed"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'180'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <AirlineSeatFlat className="h-7 w-7 rounded-md text-[#913d83]  group-hover:text-white" />
          }
          clickableRoute="/panel/admin/bed/bed-dashboard"
        />
        <InfoCards
          title="Lab Reports"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'120'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <Science className="h-7 w-7 rounded-md text-[#913d83]  group-hover:text-white" />
          }
          clickableRoute="/panel/admin/lab/all-lab-test"
        />
        <InfoCards
          title="Financial Activities"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#913d83]"
          content={'10'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            <CurrencyRupee className="h-7 w-7 rounded-md text-[#913d83]  group-hover:text-white" />
          }
          clickableRoute="/panel/admin/financial-activity/financial-dashboard"
        />

        {/* <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
					<MonthlyPaitentGraph text="Repairs Report" type="bar" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center  gap-5 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
					<IncomeVsExpence text="Repairs Report" type="pie" />
				</div> */}

        <div className="!border-grey-500 !shadow-xl col-span-12 flex w-full flex-col  justify-center gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-12">
          {/* <MaterialTable
						data={tabelData}
						components={{
							Container: (props) => <Paper {...props} elevation={5} />,
						}}
						title={<HeadStyle name="Patients" />}
						// isLoading={isValidating || loading}
						// data={customers?.map((customer: any, i: number) => {
						//   return {
						//     ...customer,
						//     sl: i + 1,

						//     timestamp: customer?.createdAt
						//       ? dayjs(customer?.createdAt).format("LLL")
						//       : "Not available",
						//     lastLoginTime: customer?.lastLogin
						//       ? dayjs(customer?.lastLogin).format("lll")
						//       : "Not Login Yet",
						//   };
						// })}
						// options={{ ...MuiTblOptions(), selection: true }}
						columns={[
							{
								title: "#",
								field: "sl",
								editable: "never",
								width: "2%",
							},
							{
								title: "Name",
								tooltip: "Name",
								searchable: true,
								field: "name",
							},

							{
								title: "Phone",
								field: "phone",
								searchable: true,
								export: true,
								emptyValue: "Not Provided",
								//   hidden:true,
							},

							{
								title: "Email",
								field: "email",
							},
							{
								title: "Payment Status",
								field: "status",
							},
							{
								title: "View Details",
								field: "view",
								emptyValue: "Not Login Yet",
								// render: ({ lastLogin }: any) => lastLogin,
								// ? dayjs(new Date(lastLogin)).format("lll")
								// : "Not Login Yet",
							},
						]}
						// actions={[
						// 	{
						// 		icon: "send",
						// 		tooltip: "Send Notification",
						// 		onClick: (evt, data: any) => {
						// 			// data?.length > 1
						// 			// 	? Swal.fire({
						// 			// 			text: "Please select only one customer to send notification",
						// 			// 			icon: "warning",
						// 			// 			confirmButtonText: "Ok",
						// 			// 	  })
						// 			// 	: setSelectedUsers(data[0]);
						// 		},
						// 	},
						// 	{
						// 		icon: "refresh",
						// 		tooltip: "Refresh Data",
						// 		isFreeAction: true,
						// 		onClick() {
						// 			// mutate();
						// 		},
						// 	},
						// ]}
					/> */}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
