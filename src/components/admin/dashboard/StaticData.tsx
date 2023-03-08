import {
  CurrencyRupee,
  Group,
  Groups,
  LocalShipping,
  Money,
  Person,
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import {
  DepartmentIcon,
  GrievancesIcon,
  PlacementIcon,
  RevenueIcon,
  StaffIcon,
  StockIcon,
  StudentsIcon,
  VehicleIcon,
} from 'assets/static-icon'
import InfoCards from './InfoCards'
// import InfoCards from "../InfoCards";

const StaticData = () => {
  const data = [
    {
      title: 'Total Students',
      iconClassName: 'bg-[#f3f8f2] group-hover:bg-theme ',
      content: '6257',
      titleClassName: 'text-slate-600 font-bold text-base',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: (
        <Avatar
          variant="rounded"
          // className="!h-10 !w-11 "
          src={StudentsIcon.src}
        />
        // <Groups className="h-7 w-7 rounded-md group-hover:text-white  text-theme" />
      ),
      clickableRoute: '/panel/admin/student/dashboard',
    },
    {
      title: 'Total Staffs',
      iconClassName: 'bg-[#f3f8f2]  group-hover:bg-theme',
      content: '355',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: (
        <Avatar
          variant="rounded"
          // className="!h-10 !w-11 !object-cover "
          src={StaffIcon.src}
        />
      ),
      clickableRoute: '/panel/admin/staff/dashboard',
    },
    {
      title: 'Total Stocks',
      iconClassName: 'bg-[#f3f8f2]  group-hover:bg-theme',
      content: '5755',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: <Avatar variant="rounded" src={StockIcon.src} />,

      clickableRoute: '/panel/admin/inventory/dashboard',
    },
    // {
    //   title: "Monthly Revenue",
    //   iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
    //   content: "₹ 203,74.00",
    //   titleClassName: "text-slate-600 font-bold text-base ",
    //   contentClassName: "text-black font-bold",
    //   className:
    //     "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
    //   icon: (
    //     <CurrencyRupee className="h-7 w-7 rounded-md group-hover:text-white  text-theme" />
    //   ),
    //   clickableRoute: "/panel/admin/payment/dashboard",
    // },
    {
      title: 'Total Revenue',
      iconClassName: 'bg-[#f3f8f2]  group-hover:bg-theme',
      content: '₹ 1,37,450.00',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: <Avatar variant="rounded" src={RevenueIcon.src} />,
      clickableRoute: '/panel/admin/payment/dashboard',
    },
    {
      title: 'Departments',
      iconClassName: 'bg-[#f3f8f2]  group-hover:bg-theme',
      content: '15',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: <Avatar variant="rounded" src={DepartmentIcon.src} />,
      clickableRoute: '/panel/admin/department/dashboard',
    },
    {
      title: 'Placements',
      iconClassName: 'bg-[#f3f8f2]  group-hover:bg-theme',
      content: '755',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: <Avatar variant="rounded" src={PlacementIcon.src} />,
      clickableRoute: '/panel/admin/placement/dashboard',
    },
    {
      title: 'Active Vehicles',
      iconClassName: '!bg-[#f3f8f2]  group-hover:!bg-theme',
      content: '59',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: <Avatar variant="rounded" src={VehicleIcon.src} />,
      clickableRoute: '/panel/admin/transport/dashboard',
    },
    {
      title: 'Grievances',
      iconClassName: '!bg-[#f3f8f2]  group-hover:!bg-theme',
      content: '115',
      titleClassName: 'text-slate-600 font-bold text-base ',
      contentClassName: 'text-black font-bold',
      className:
        'col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95',
      icon: <Avatar variant="rounded" src={GrievancesIcon.src} />,
      clickableRoute: '/panel/admin/grievance',
    },
  ]

  return (
    <div className="grid grid-cols-12 content-between gap-6 p-6 ">
      {data?.map((item, index) => (
        <InfoCards
          key={index}
          title={item?.title}
          iconClassName={item?.iconClassName}
          content={item?.content}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={item?.className}
          icon={item?.icon}
          clickableRoute={item?.clickableRoute}
        />
      ))}
    </div>
  )
}

export default StaticData
