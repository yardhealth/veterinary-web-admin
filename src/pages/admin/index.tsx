import AdminLayout from 'layouts/admin'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ColumnChartUserDashboard from 'components/admin/dashboard/ColumnChartUserDashboard'
import RegisteredPetDetails from 'components/admin/dashboard/RegisteredPetDetails'
import InfoCards from 'components/core/InfoCards'
import Avatar from '@mui/material/Avatar'
import { useGET } from 'hooks'
import {
  CompletedAppointments,
  TotalClients,
  TotalIncome,
  UpcomingAppointments,
} from 'assets/static-icon'

const Dashboard = () => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<any>({
    dialogOpen: false,
    cardRoute: '',
    highlightText: '',
    animationData: '',
  })

  const { data: upcomingAppointment, mutate: upcoming } = useGET<any[]>(
    `dashboard/upcoming-appointment`
  )
  console.log(upcomingAppointment)

  const { data: completedAppointment, mutate: completed } = useGET<any[]>(
    `dashboard/completed-appointment`
  )

  const { data: totalClients, mutate: clients } = useGET<any[]>(
    `dashboard/total-clients`
  )
  console.log(totalClients)

  const { data: totalIncome, mutate: income } = useGET<any[]>(
    `dashboard/total-income`
  )

  const { data: petCategory, mutate: pet } = useGET<any[]>(
    `dashboard/pet-category`
  )
  console.log(petCategory)

  const { data: yearUpcoming, mutate: yearUp } = useGET<any[]>(
    `dashboard/appointment-year-upcoming`
  )
  console.log(yearUpcoming)

  const { data: yearCompleted, mutate: yearComp } = useGET<any[]>(
    `dashboard/appointment-year-Completed`
  )

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="m-5 !mb-6 grid grid-cols-12 content-between gap-6 ">
        <InfoCards
          title="All Appointments"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={`${upcomingAppointment?.success?.data}`}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <PermContactCalendar className="h-7 w-7 rounded-md text-[#ff7717] group-hover:text-white " />
            <Avatar variant="rounded" src={UpcomingAppointments.src} />
          }
          clickableRoute="/admin/appointments/all-appointments"
        />
        <InfoCards
          title="Completed Appointments"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={`${completedAppointment?.success?.data}`}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <Article className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={CompletedAppointments.src} />
          }
          clickableRoute="/admin/appointments/completed-appointments"
        />
        <InfoCards
          title="Total Clients"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={`${totalClients?.success?.data}`}
          titleClassName="text-slate-600 font-bold text-base"
          contentClassName="text-black font-bold"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <FaStethoscope className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={TotalClients.src} />
          }
          clickableRoute="/admin/userList/owner-list"
        />

        <InfoCards
          title="Total Income"
          iconClassName="bg-[#f3f8f2] group-hover:bg-[#ff7717]"
          content={`${
            totalIncome?.success?.data === undefined
              ? '₹1,20,000/-'
              : totalIncome?.success?.data
          }`}
          titleClassName="text-black font-bold text-base"
          contentClassName="text-black"
          className="col-span-12 w-full bg-white transition-all duration-500 ease-in-out hover:scale-95 sm:col-span-12 md:col-span-6 lg:col-span-3"
          icon={
            // <Build className="text-white h-7 w-7 rounded-md group-hover:text-white " />
            // <Science className="h-7 w-7 rounded-md text-[#ff7717]  group-hover:text-white" />
            <Avatar variant="rounded" src={TotalIncome.src} />
          }
          clickableRoute="/admin/invoices/all-invoices"
        />

        <div className="!border-grey-500 !shadow-xl col-span-12  w-full gap-5 rounded-xl pt-9 md:col-span-12 lg:col-span-8">
          <ColumnChartUserDashboard
            type={'bar'}
            title={'Upcoming  vs Completed Appointment'}
            categories={
              yearUpcoming?.success?.data?.map((item) => {
                return item?._id
              }) || []
            }
            series={[
              {
                name: 'Upcoming',
                data:
                  yearUpcoming?.success?.data?.map((item) => {
                    return item?.Upcoming
                  }) || [],
              },
              {
                name: 'Completed',
                data:
                  yearCompleted?.success?.data?.map((item) => {
                    return item?.Completed
                  }) || [],
              },
            ]}
            className={'col-span-12   flex  flex-col gap-10 '}
          />
        </div>
        <div className="col-span-12 gap-2 md:col-span-12 lg:col-span-4">
          <RegisteredPetDetails
            pieLabel={
              petCategory?.success?.data?.map((item) => {
                return item?._id
              }) || []
            }
            pieSeries={
              petCategory?.success?.data?.map((item) => {
                return item?.total
              }) || []
            }
            title={'Registered Pet Details'}
            className={
              'shadow-lg col-span-12  flex flex-col items-center gap-4 rounded-xl border bg-white p-6 md:col-span-12 lg:col-span-5'
            }
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
