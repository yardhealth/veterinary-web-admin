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
import Avatar from '@mui/material/Avatar'
import {
  CompletedAppointments,
  DepartmentIcon,
  Reports,
  TotalClients,
  TotalExpense,
  TotalIncome,
  TotalStaffs,
  UpcomingAppointments,
} from 'assets/static-icon'
import ColumnChartUserDashboard from 'components/admin/dashboard/ColumnChartUserDashboard'
import RegisteredPetDetails from 'components/admin/dashboard/RegisteredPetDetails'
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
      <div className="m-5 !mb-6 grid grid-cols-12 content-between gap-6 ">
        <InfoCards
          title="Total Clients"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'40'}
          titleClassName="text-slate-600 font-bold text-base"
          contentClassName="text-black font-bold"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <FaStethoscope className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={TotalClients.src} />
          }
          clickableRoute="/panel/admin/doctor/doctor-dashboard"
        />
        <InfoCards
          title="Total Staffs"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'150'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <LocalHotel className=" h-7 w-7 rounded-md text-[#ff7717] group-hover:text-white " />
            <Avatar variant="rounded" src={TotalStaffs.src} />
          }
          clickableRoute="/panel/admin/patient/patient-dashboard"
        />
        <InfoCards
          title="Total Rooms"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'10'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <Apartment className="h-7 w-7 rounded-md text-[#ff7717] group-hover:text-white " />
            <Avatar variant="rounded" src={TotalStaffs.src} />
          }
          clickableRoute="/panel/admin/clinics/clinic-dashboard"
        />
        <InfoCards
          title="Upcoming Appointments"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'170'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <PermContactCalendar className="h-7 w-7 rounded-md text-[#ff7717] group-hover:text-white " />
            <Avatar variant="rounded" src={UpcomingAppointments.src} />
          }
          clickableRoute="/panel/admin/appointments/appointments-dashboard"
        />
        <InfoCards
          title="Completed Appointments"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'80'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <Article className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={CompletedAppointments.src} />
          }
          clickableRoute="/panel/admin/users/user-dashboard"
        />
        <InfoCards
          title="Reports"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'180'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <AirlineSeatFlat className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={Reports.src} />
          }
          clickableRoute="/panel/admin/bed/bed-dashboard"
        />
        <InfoCards
          title="Total Income"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'120'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <Science className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={TotalIncome.src} />
          }
          clickableRoute="/panel/admin/lab/all-lab-test"
        />
        <InfoCards
          title="Total Expense"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={'10'}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <CurrencyRupee className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={TotalExpense.src} />
          }
          clickableRoute="/panel/admin/financial-activity/financial-dashboard"
        />

        <div className="!border-grey-500 !shadow-xl col-span-12  w-full gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-8">
          <ColumnChartUserDashboard
            type={'bar'}
            title={'Past Income vs Expenxe Report'}
            categories={[
              '2022',
              '2021',
              '2020',
              '2019',
              '2018',
              '2017',
              '2016',
            ]}
            series={[
              {
                name: 'Income',
                data: [44, 55, 57, 56, 61, 58, 63],
              },
              {
                name: 'Expense',
                data: [76, 85, 101, 98, 87, 105, 91],
              },
            ]}
            className={'col-span-12   flex  flex-col gap-10 '}
          />
        </div>
        <div className="col-span-12 gap-2 md:col-span-12 lg:col-span-4">
          <RegisteredPetDetails
            pieLabel={['Dogs', 'Cats', 'Cows', 'Birds', 'Other']}
            pieSeries={[5000, 4590, 2422, 5922, 1522]}
            title={'Registered Pet Details'}
            className={
              'shadow-lg col-span-12  flex flex-col items-center gap-4 rounded-xl border bg-white p-6 md:col-span-12 lg:col-span-5'
            }
          />
        </div>
        {/* <div className="col-span-12 pt-9 w-full flex flex-col justify-center  gap-5 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
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
