import { ICONS } from 'assets'
import { InfoCards, StatisticsCard } from 'components/admin'
import { AdminLayout } from 'layouts'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { TotalCard } from 'components/admin'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import { CashFlowChart } from 'components/admin'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useFetch } from 'hooks'
import { formatCurrency } from '@ashirbad/js-core'

const Login: NextPage = () => {
  const { push } = useRouter()
  const [invoices] = useFetch<any[]>(`/Invoices`, {
    needNested: false,
    needArray: true,
  })
  const [expenses] = useFetch<any[]>(`/Expenses`, {
    needNested: false,
    needArray: true,
  })
  const [payments] = useFetch<any[]>(`/Payments`, {
    needNested: false,
    needArray: true,
  })
  console.log(
    formatCurrency(
      invoices
        ?.filter((item) => item?.isPaid === false)
        ?.reduce((acc, item) => item?.totalPrice + acc, 0) || 0
    )
  )
  console.log(
    payments?.reduce((acc, item) => item?.amountReceived + acc, 0) || 0
  )
  return (
    <AdminLayout title="Dashboard - Admin Panel">
      <section className="px-14 py-2 lg:px-6 lg:py-3">
        <div className="flex flex-col justify-between gap-4  lg:flex-row">
          <TotalCard
            title={'Total Receivables'}
            subTitle={`Total Unpaid Invoices :-  ${formatCurrency(
              invoices
                ?.filter((item) => item?.isPaid === false)
                ?.reduce((acc, item) => item?.totalPrice + acc, 0) || 0
            )}`}
            // currentValue={`₹ 0.00`}
            // overDueValue={`₹ 0.00`}
          />
          <TotalCard
            title={'Total Purchases'}
            subTitle={`Total Expenses :-  ${formatCurrency(
              expenses?.reduce((acc, item) => item?.amount + acc, 0) || 0
            )}`}
            // currentValue={`₹ 0.00`}
            // overDueValue={`₹ 0.00`}
          />
          {/* <StatisticsCard
            className="h-76 w-full lg:w-[65%]"
            data={[
              {
                img: <ICONS.Users className="h-8 w-8" />,
                title: 'Users',
                count: '30',
                className: 'bg-purple-600',
              },
              {
                img: <ICONS.Notification className="h-8 w-8" />,
                title: 'Notifications',
                count: '16',
                className: 'bg-green-500',
              },
              {
                img: <ICONS.Auditorium className="h-8 w-8" />,
                title: 'Events',
                count: '1',
                className: 'bg-orange-500',
              },
              {
                img: <ICONS.Help className="h-8 w-8" />,
                title: 'Supports',
                count: '1',
                className: 'bg-sky-500',
              },
            ]}
          /> */}
          {/* <InfoCards
            className={`w-full lg:w-[38%]`}
            data={[
              {
                icon: <ICONS.Users className="h-8 w-8" />,
                title: 'Users',
                className: 'border-b border-r',
                count: `${'10'}`,
              },
              {
                icon: <ICONS.Notification className="h-8 w-8" />,
                title: 'Notifications',
                className: 'border-b',
                count: `${'10'}`,
              },
              {
                icon: <ICONS.Auditorium className="h-8 w-8" />,
                title: 'Events',
                className: 'border-r',
                count: `${'10'}`,
              },
              {
                icon: <ICONS.Help className="h-8 w-8" />,
                title: 'Supports',
                className: '',
                count: `${'10'}`,
              },
            ]}
          /> */}
        </div>

        <div className="mt-5 flex justify-between gap-11 rounded-lg p-5 shadow-3xl">
          <div className="basis-4/6">
            <h1 className="text-xl font-semibold text-theme">Cash Flow</h1>
            <div>
              <CashFlowChart text="Cash Flow" type="bar" />
            </div>
          </div>

          <div className="gap-5 px-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-theme">
                This Fiscal Year
              </h1>
              <ArrowDropDownIcon />
            </div>
            <div className="mt-6 flex h-full flex-col items-end gap-11">
              {/* <div className="flex flex-col items-end">
                <p>Cash as on 22/07/01</p>
                
                <p className="mt-2">₹ 0.00</p>
              </div> */}
              <div className="flex flex-col items-end">
                <p className="text-blue-600">Total Sales</p>
                <div className="mt-2 flex items-center gap-1">
                  <p>
                    {formatCurrency(
                      invoices
                        ?.filter((item) => item?.isPaid === false)
                        ?.reduce((acc, item) => item?.totalPrice + acc, 0) || 0
                    )}
                  </p>
                  <AddIcon style={{ fontSize: 15 }} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-green-600">Total Payments</p>
                <div className="mt-2 flex items-center gap-1">
                  <p>
                    {formatCurrency(
                      payments?.reduce(
                        (acc, item) => item?.amountReceived + acc,
                        0
                      ) || 0
                    )}
                  </p>
                  <AddIcon style={{ fontSize: 15 }} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-red-600">Total Expenses</p>
                <div className="mt-2 flex items-center gap-1">
                  <p>
                    {formatCurrency(
                      expenses?.reduce((acc, item) => item?.amount + acc, 0) ||
                        0
                    )}
                  </p>
                  <RemoveIcon style={{ fontSize: 15 }} />
                </div>
              </div>
              {/* <div className="flex flex-col items-end">
                <p className="text-blue-600">Cash as on 22/07/01</p>
                <p className="mt-2">₹ 0.00</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}

export default Login
