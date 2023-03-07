import React, { useState } from 'react'
// import { AddInVoiceSchema } from 'schemas'
import * as Yup from 'yup'
import { Person } from '@mui/icons-material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useFormik } from 'formik'
import { TextInput } from 'components/core'
import { Button } from '@mui/material'
import { FieldComponent } from '../invoice'
// import FieldComponent from './FieldComponent'

const AddProjectForm = () => {
  const [numOfField, setNumOfField] = useState<any>([
    {
      id: 1,
      item: '',
      quantity: '',
      rate: '',
      amount: '',
    },
  ])

  const addNewFieldOnBtnClick = () => {
    setNumOfField((prev: any[]) => [
      ...prev,
      { id: prev.length + 1, item: '', quantity: '', rate: '', amount: '' },
    ])
  }

  const AddInvoiceSchema = [
    {
      key: '1',
      name: 'customer name',
      label: 'Customer Name *',
      placeholder: 'Enter Customer Name',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'text',
      validationSchema: Yup.string()
        .required('Customer Name required')
        .min(2, 'Customer Name must be at least 2 characters'),
      initialValues: '',
      icon: <Person />,
      required: true,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
    {
      key: '2',
      name: 'invoice',
      label: 'Invoice *',
      placeholder: 'Enter Invoice Number',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'number',
      validationSchema: Yup.string()
        .required('Invoice  required')
        .min(2, 'Invoice  must be at least 2 characters'),
      initialValues: '',
      icon: <ReceiptIcon />,
      required: true,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
    {
      key: '3',
      name: 'order number',
      label: 'Order Number',
      placeholder: 'Enter Order Number',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'number',
      validationSchema: Yup.string()
        .required('Invoice  required')
        .min(2, 'Invoice  must be at least 2 characters'),
      initialValues: '',
      icon: <ReceiptIcon />,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
    {
      key: '2.4',
      name: 'terms',
      label: 'Terms',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'select',
      validationSchema: Yup.string()
        .required('Invoice  required')
        .min(2, 'Invoice  must be at least 2 characters'),
      initialValues: '',
      icon: <ReceiptIcon />,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      options: [
        { key: 1, label: 'Net 15', value: 'Net 15' },
        { key: 2, label: 'Net 30', value: 'Net 30' },
        { key: 3, label: 'Net 45', value: 'Net 45' },
        { key: 4, label: 'Net 60', value: 'Net 60' },
        {
          key: 5,
          label: 'Due end of the month',
          value: 'Due end of the month',
        },
        {
          key: 6,
          label: 'Due end of next month',
          value: 'Due end of next month',
        },
        {
          key: 7,
          label: 'Due on Receipt',
          value: 'Due on Receipt',
        },
        {
          key: 8,
          label: 'Custom',
          value: 'Custom',
        },
      ],
    },
    {
      key: '2.5',
      name: 'salesperson',
      label: 'Salesperson',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'select',
      validationSchema: Yup.string()
        .required('Invoice  required')
        .min(2, 'Invoice  must be at least 2 characters'),
      initialValues: '',
      icon: <ReceiptIcon />,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      options: [
        { key: 1, label: 'Demo User', value: 'Demo User' },
        { key: 2, label: 'Dummy User', value: 'Dummy User' },
      ],
    },
    {
      key: '4',
      name: 'invoice date',
      label: 'Invoice Date *',
      placeholder: '28/01/2000',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'date',
      initialValues: '',
      icon: <ReceiptIcon />,
      required: true,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
    {
      key: '5',
      name: 'due date',
      label: 'Due Date',
      placeholder: '28/01/2000',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'date',
      initialValues: '',
      icon: <ReceiptIcon />,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
    {
      key: '6',
      name: 'subject',
      label: 'Subject',
      placeholder: 'Let your customer know what this invoice is for',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'string',
      validationSchema: Yup.string().min(
        2,
        'Subject must be at least 2 characters'
      ),
      initialValues: '',
      icon: <ReceiptIcon />,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
  ]

  const initialValues = AddInvoiceSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValues
      return accumulator
    },
    {} as any
  )

  const validationSchema = AddInvoiceSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema
      return accumulator
    },
    {} as any
  )

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  console.log(formik.values)

  console.log(numOfField)

  return (
    <div className="pb-10">
      <form className="grid w-full grid-cols-12 gap-4 px-4 pt-10">
        {AddInvoiceSchema?.map((items) => (
          <TextInput
            title={items?.label}
            key={items?.key}
            placeholder={items?.placeholder}
            name={items?.name}
            type={items?.type as any}
            value={formik?.values[items?.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={items?.options}
            // rows={items?.rows}
            size="small"
            fullWidth
            // multiline={items?.multiline}
            error={Boolean(
              formik?.touched[items?.name] && formik?.errors[items?.name]
            )}
            helperText={
              formik?.touched[items?.name] &&
              (formik?.errors[items?.name] as any)
            }
            styleArea={`${
              // items?.multiline
              //   ? 'col-span-12 md:col-span-12 !w-full'
              //   :
              'col-span-12 md:col-span-6 !w-full'
            }`}
            styleField="w-full col-span-12 overflow-hidden"
          />
        ))}
      </form>

      {/* <div className="mt-11 flex items-center justify-center gap-10">
        <div>
          <label>Item Details</label> <br />
          <input
            type="text"
            className="rounded-md border border-slate-600 p-2"
          />
        </div>
        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={1.0}
          />
        </div>
        <div>
          <label>Rate</label>
          <br />
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={0}
          />
        </div>
        <div>
          <label>Amount</label>
          <br />
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={0}
          />
        </div>
      </div> */}

      <div>
        <table className="mt-10 w-full rounded-lg p-3">
          <tr className=" border-2 border-theme">
            <th className="border-2 border-theme p-3">Items Details</th>
            <th className="border-2 border-theme p-3">Quantity</th>
            <th className="border-2 border-theme p-3">Rate</th>
            <th className="border-2 border-theme p-3">Amount</th>
            <th className="border-2 border-theme p-3">Delete</th>
          </tr>

          {/* {numOfField} */}

          {/* {numOfField?.map((item: any) => (
            <FieldComponent
              key={item.id}
              numOfField={numOfField}
              setNumOfField={() => {
                setNumOfField
              }}
            />
          ))} */}
        </table>
        <div className="mt-10">
          <button
            className="rounded-lg bg-blue-500 px-3 py-3 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-theme"
            onClick={addNewFieldOnBtnClick}
          >
            Add Another Line
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <label>Customer Notes</label>
          <br />
          <textarea
            name="note"
            id="Note"
            className="mt-4 h-20 w-96 rounded-md border-2 border-cyan-800 p-1"
          ></textarea>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p>Sub Total</p>
            <p>0.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Discount</p>
            <input
              type="number"
              className="rounded-md border-2 border-cyan-800 p-1"
            />
            <select
              name="discount"
              id="dis"
              className="rounded-md border-2 border-cyan-800 p-1"
            >
              <option value="%">%</option>
              <option value="₹">₹</option>
            </select>
            <p>0.00</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <input type="radio" />
              <label>TDS</label>
              <input type="radio" />
              <label>TCS</label>
            </div>
            <select
              name=""
              id=""
              className="rounded-md border-2 border-cyan-800 p-1"
            >
              <option value="%">sdkjdkj</option>
              <option value="₹">sdkjkjsdkj</option>
              <option value="₹">sdkjkjsd</option>
            </select>
            <p>- 0.00</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              defaultValue="Adjustment"
              className="rounded-md border-2 border-cyan-800 p-1"
            />
            <input
              type="text"
              className="rounded-md border-2 border-cyan-800 p-1"
            />
            <p>0.00</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-xl">Total (₹)</h1>
            <p className="text-xl">0.00</p>
          </div>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between">
        <div>
          <label>Terms and Condition</label>
          <br />
          <textarea
            name="note"
            id="Note"
            className="mt-4 h-20 w-96 rounded-md border-2 border-cyan-800 p-1"
          ></textarea>
        </div>

        <div>
          <label>Attched Files to Invoice</label>
          <br />
          <input type="file" className="mt-4" />
        </div>
      </div>
    </div>
  )
}

export default AddProjectForm
