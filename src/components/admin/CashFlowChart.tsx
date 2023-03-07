import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import React from 'react'
import { useFetch } from 'hooks'
import moment from 'moment'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const CashFlowChart = ({
  type,
  text = '',
}: {
  type: 'bar' | 'area' | 'line'
  text?: string
}) => {
  const [incomeValue, setIncomeValue] = useState<any>()
  const [expensesValue, setExpensesValue] = useState<any>()
  const [paymentValue, setPaymentValue] = useState<any>()
  const [allmonth, setAllMonth] = useState<any>()
  let mounted = false
  const [invoices] = useFetch<any[]>(`/Invoices`, {
    needArray: true,
  })
  const [expenses] = useFetch<any[]>(`/Expenses`, {
    needArray: true,
  })
  const [payments] = useFetch<any[]>(`/Payments`, {
    needArray: true,
  })

  // console.log(totalInvoices)
  // console.log(totalExpenses)
  // console.log(totalPayments)

  useEffect(() => {
    ;(() => {
      if (!invoices?.length || !expenses?.length || !payments?.length) return
      const totalInvoices = invoices?.map((item) => ({
        price: item?.netPrice,
        month: moment(item?.createdAt).format('MMM YYYY'),
      }))

      const totalExpenses = expenses?.map((item) => ({
        price: item?.amount,
        month: moment(item?.createdAt).format('MMM YYYY'),
      }))

      const totalPayments = payments?.map((item) => ({
        price: item?.amountReceived,
        month: moment(item?.createdAt).format('MMM YYYY'),
      }))
      const allMonth = Array.from(
        new Set([
          ...totalInvoices?.map((item) => item?.month),
          ...totalExpenses?.map((item) => item?.month),
          ...totalPayments?.map((item) => item?.month),
        ])
      )
      setAllMonth(allMonth)
      const findAllValue = (value: any[]) => {
        let valueArray: any[] = []

        for (let i = 0; i < value.length; i++) {
          let exist = valueArray.find((item) => item?.month === value[i].month)

          if (exist) {
            let newArray = valueArray.map((item) => {
              if (item?.month === exist?.month) {
                return {
                  data: exist?.data + value[i].price,
                  month: value[i].month,
                }
              }
              return item
            })
            valueArray = newArray
          } else {
            valueArray.push({
              data: value[i].price,
              month: value[i].month,
            })
          }
        }

        return allMonth?.map((item) => {
          let exist = valueArray?.find((inner) => inner.month === item)
          if (!exist) {
            return {
              month: item,
              data: 0,
            }
          } else {
            return exist
          }
        })
      }

      setIncomeValue(findAllValue(totalInvoices))
      setExpensesValue(findAllValue(totalExpenses))
      setPaymentValue(findAllValue(totalPayments))
    })()
  }, [invoices?.length, expenses?.length, payments?.length])

  const options = {
    series: [
      {
        name: 'Sales',
        data: incomeValue?.map((item: any) => item?.data) || [],
      },
      {
        name: 'Expenses',
        data: expensesValue?.map((item: any) => item?.data) || [],
      },
      {
        name: 'Payments',
        data: paymentValue?.map((item: any) => item?.data) || [],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: allmonth || [],
    },
    yaxis: {
      title: {
        // text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$ " + val + " thousands"
      //   }
      // }
    },
  }

  return (
    <ApexCharts
      height={'400'}
      options={{
        series: [
          {
            name: 'Sales',
            data: incomeValue?.map((item: any) => item?.data) || [],
          },
          {
            name: 'Expenses',
            data: expensesValue?.map((item: any) => item?.data) || [],
          },
          {
            name: 'Payments',
            data: paymentValue?.map((item: any) => item?.data) || [],
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            // endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: allmonth || [],
        },
        yaxis: {
          title: {
            // text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            // formatter: function (val) {
            //   return '$ ' + val + ' thousands'
            // },
          },
        },
      }}
      series={options.series}
      type={type}
    />
  )
}

export default CashFlowChart
