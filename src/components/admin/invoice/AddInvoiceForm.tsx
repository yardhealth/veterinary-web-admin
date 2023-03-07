import React, { useState } from 'react'
// import { AddInVoiceSchema } from 'schemas'
import * as Yup from 'yup'
import { Person } from '@mui/icons-material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Form, Formik, useFormik } from 'formik'
import { AdminAutocomplete, TextInput } from 'components/core'
import { Button } from '@mui/material'
import FieldComponent from './FieldComponent'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { RotateLeft } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import PhotoUpload from 'components/core/PhotoUpload'
import { database, storage } from 'configs'
import CustomerType from 'types/customer'
import { useFetch } from 'hooks'
import CategoryType from 'types/category'
import { useMemo } from 'react'
import { User } from 'types'
import { v4 as uuidV4 } from 'uuid'
import { formatCurrency } from '@ashirbad/js-core'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import AdminType from 'types/admin'

const AddInvoiceForm = () => {
  const [staffs] = useFetch<User[]>(`/Users`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const [taxes] = useFetch<any>(`/Taxes`, {
    needNested: false,
    needArray: true,
  })

  const AddEstimateSchema = useMemo(() => {
    return [
      {
        key: '1',
        name: 'user',
        isMapable: true,
        label: 'Customer Name *',
        placeholder: 'Enter Customer Name',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
        validationSchema: Yup.string().required('Customer Name required'),
        initialValues: '',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: customers?.map((item: CustomerType) => ({
          label: `${item?.primaryContact} (${item?.email}) `,
          value: `${item?.id}`,
          key: `${item?.id}`,
        })),
      },
      {
        key: '2',
        isMapable: true,
        name: 'invoice',
        label: 'Invoice# *',
        placeholder: 'Enter Invoice Number',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
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
        isMapable: true,
        name: 'orderNumber',
        label: 'Order Number',
        placeholder: 'Enter Order Number',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        validationSchema: Yup.string()
          .required('Order Number is  required')
          .min(2, 'Order Number  must be at least 2 characters'),
        required: true,
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
        key: '2.5',
        isMapable: true,
        name: 'salesperson',
        label: 'Sales person',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
        // validationSchema: Yup.string()
        //   .required('Customer Name required')
        //   .min(2, 'Customer Name must be at least 2 characters'),
        initialValues: '',
        icon: <Person />,
        // required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: staffs
          ?.filter((staff: AdminType) => staff?.role === 'sales-person')
          ?.map((item: CustomerType) => ({
            label: `${item?.displayName} (${item?.email}) `,
            value: `${item?.id}`,
            key: `${item?.id}`,
          })),
      },
      {
        key: '8.5',
        isMapable: true,
        name: 'terms',
        label: 'Terms',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
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
        key: '9.8',
        name: 'invoiceDate',
        isMapable: true,
        label: 'Invoice Date *',
        placeholder: '28/01/2000',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Invoice Date required'),
        required: true,
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
        key: '8.2',
        name: 'dueDate',
        label: 'Due Date',
        isMapable: true,
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
        isMapable: true,
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
      {
        key: '7',
        isMapable: false,
        name: 'discount',
        label: 'Discount',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'number',
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
        key: '8',
        isMapable: false,
        name: 'sign',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'radio',
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
        key: '9',
        isMapable: false,
        name: 'tax',
        label: 'Tax',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
        initialValues: '',
        icon: <ReceiptIcon />,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },

        options: [
          {
            key: 1,
            label: 'Commission or Brokerage -[5%]',
            value: 'Commission or Brokerage -[5%]',
          },
          {
            key: 2,
            label: 'Commission or Brokerage (Reduced)	 - [3.75%]',
            value: 'Commission or Brokerage (Reduced)	 - [3.75%]',
          },
          {
            key: 3,
            label: 'Dividend	- [10%]',
            value: 'Dividend	- [10%]',
          },
          {
            key: 4,
            label: 'Dividend (Reduced) - [7.5%]',
            value: 'Dividend (Reduced) - [7.5%]',
          },
          {
            key: 5,
            label: 'Other Interest than securities - [10%]',
            value: 'Other Interest than securities - [10%]',
          },
          {
            key: 6,
            label: 'Other Interest than Securities(Reduced) - [7.5%]',
            value: 'Other Interest than Securities(Reduced) - [7.5%]',
          },
          {
            key: 7,
            label: 'Payment of contractors for Others - [2%]',
            value: 'Payment of contractors for Others - [2%]',
          },
          {
            key: 8,
            label: 'Payment of contractors for Others (Reduced) - [1%]',
            value: 'Payment of contractors for Others (Reduced) - [1%]',
          },
          {
            key: 9,
            label: 'Payment of contractors HUF/Indiv - [1%]',
            value: 'Payment of contractors HUF/Indiv - [1%]',
          },
          {
            key: 10,
            label: 'Payment of contractors HUF/Indiv (Reduced) - [0.75%]',
            value: 'Payment of contractors HUF/Indiv (Reduced) - [0.75%]',
          },
          {
            key: 11,
            label: 'Professional Fees	 - [10%]',
            value: 'Professional Fees	 - [10%]',
          },
          {
            key: 12,
            label: 'Professional Fees (Reduced)	 - [7.5%]',
            value: 'Professional Fees (Reduced)	 - [7.5%]',
          },
        ],
      },
      {
        key: '10',
        isMapable: false,
        name: 'customernote',
        label: 'Customer Note',
        placeholder: 'Thanks for your Bussiness',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        // validationSchema: Yup.string()
        //   .required('Invoice  required')
        //   .min(2, 'Invoice  must be at least 2 characters'),
        initialValues: '',
        icon: <ReceiptIcon />,
        // required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        key: '11',
        isMapable: false,
        name: 'termsandcondition',
        label: 'Terms and Conditions',
        placeholder: 'Enter terms and conditions',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        // validationSchema: Yup.string()
        //   .required('Invoice  required')
        //   .min(2, 'Invoice  must be at least 2 characters'),
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
        key: '12',
        isMapable: false,
        name: 'Adjustment',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        // validationSchema: Yup.string()
        //   .required('Invoice  required')
        //   .min(2, 'Invoice  must be at least 2 characters'),
        initialValues: '',
        icon: <ReceiptIcon />,
        // required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      // {
      //   key: '13',
      //   isMapable: false,
      //   name: 'AttachedFileToInvoice',
      //   label: 'Attched File To Invoice',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   type: 'file',
      //   initialValues: '',
      //   icon: <ReceiptIcon />,
      //   required: true,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      // },
      {
        key: '13ds',
        isMapable: false,
        isPricingDetails: true,
        name: 'pricingDetails',
        label: 'Pricing Details',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'table',
        initialValues: [
          {
            id: 1,
            item: '',
            quantity: 0,
            rate: 0,
            amount: 0,
          },
        ],
        // validationSchema: Yup.array().required('Item Pricing Required'),
        icon: <ReceiptIcon />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
    ]
  }, [customers])

  const initialValues = AddEstimateSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValues
      return accumulator
    },
    {} as any
  )

  const validationSchema = AddEstimateSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema
      return accumulator
    },
    {} as any
  )

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      console.log(values)
      const ID = Date.now()
      try {
        database.ref(`Invoices/${ID}`).update({
          ...values,
          isPaid: false,
          netPrice: subTotal || 0,
          discountPrice: discountSubTotal || 0,
          taxPrice: taxTotal || 0,
          totalPrice: TotalPrice || 0,
          createdAt: new Date().toString(),
        })
        database.ref(`Customers/${values?.user}/Invoices/${ID}`).update({
          ...values,
          isPaid: false,
          netPrice: subTotal || 0,
          discountPrice: discountSubTotal || 0,
          taxPrice: taxTotal || 0,
          totalPrice: TotalPrice || 0,
          createdAt: new Date().toString(),
        })
        formik.resetForm()

        Swal.fire('Success', 'Successfully added', 'success')
      } catch (error: any) {
        console.log(error)
        Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
      }
    },
  })

  const addNewFieldOnBtnClick = () => {
    let exist

    formik?.setFieldValue('pricingDetails', [
      ...formik?.values?.pricingDetails,
      {
        id: uuidV4(),
        item: '',
        quantity: 0,
        rate: 0,
        amount: 0,
      },
    ])
  }

  const deleteField = (id: any) => {
    if (formik?.values?.pricingDetails.length > 1) {
      formik?.setFieldValue(
        'pricingDetails',
        formik?.values?.pricingDetails.filter((item: any) => item.id !== id)
      )
    }
  }

  const subTotal = formik?.values?.pricingDetails.reduce(
    (currentValue: any, acc: any) => {
      return Number(acc?.quantity) * Number(acc?.rate) + currentValue
    },

    0
  )
  const discountSubTotal =
    (formik.values.sign === '%' &&
      formik.values.discount &&
      (Number(formik.values.discount) / 100) *
        formik?.values?.pricingDetails.reduce(
          (currentValue: any, acc: any) => {
            return Number(acc?.quantity) * Number(acc?.rate) + currentValue
          },

          0
        )) ||
    (formik.values.sign === '₹' && formik.values.discount) ||
    0
  const taxTotal =
    (formik?.values?.tax &&
      formik?.values?.sign === '%' &&
      formik?.values?.discount &&
      (formik?.values?.tax / 100) *
        (formik?.values?.pricingDetails.reduce(
          (currentValue: any, acc: any) => {
            return Number(acc?.quantity) * Number(acc?.rate) + currentValue
          },

          0
        ) -
          (Number(formik.values.discount) / 100) *
            formik?.values?.pricingDetails.reduce(
              (currentValue: any, acc: any) => {
                return Number(acc?.quantity) * Number(acc?.rate) + currentValue
              },

              0
            ) +
          Number(formik.values.adjustmentPrice || 0))) ||
    (formik?.values?.tax &&
      formik.values.sign === '₹' &&
      (Number(formik?.values?.tax) / 100) *
        (formik?.values?.pricingDetails?.reduce(
          (currentValue: any, acc: any) => {
            return Number(acc?.quantity) * Number(acc?.rate) + currentValue
          },
          0
        ) -
          Number(formik?.values?.discount) +
          Number(formik?.values?.adjustmentPrice || 0))) ||
    (formik?.values?.tax &&
      formik?.values?.adjustmentPrice &&
      (Number(formik?.values?.tax) / 100) *
        (formik?.values?.pricingDetails?.reduce(
          (currentValue: any, acc: any) => {
            return Number(acc?.quantity) * Number(acc?.rate) + currentValue
          },
          0
        ) +
          Number(formik?.values?.adjustmentPrice || 0))) ||
    (formik?.values?.tax &&
      formik?.values?.adjustmentPrice &&
      (Number(formik?.values?.tax) / 100) *
        formik?.values?.pricingDetails?.reduce(
          (currentValue: any, acc: any) => {
            return Number(acc?.quantity) * Number(acc?.rate) + currentValue
          },
          0
        )) ||
    (formik?.values?.tax &&
      (Number(formik?.values?.tax) / 100) *
        formik?.values?.pricingDetails?.reduce(
          (currentValue: any, acc: any) => {
            return Number(acc?.quantity) * Number(acc?.rate) + currentValue
          },
          0
        )) ||
    0
  const adjustment = formik.values.adjustmentPrice || 0
  const TotalPrice =
    Number(subTotal - discountSubTotal) + adjustment + taxTotal || 0
  console.log(subTotal)
  console.log(discountSubTotal)
  console.log(adjustment)
  console.log(taxTotal)
  // console.log(Number(subTotal - discountSubTotal) + adjustment + taxTotal)
  const router = useRouter()
  return (
    <div className="pb-10">
      <form className="grid w-full grid-cols-12 gap-4 px-4 pt-10">
        {AddEstimateSchema?.map((items) => {
          if (items?.type === 'autocomplete' && items.isMapable === true) {
            return (
              <div
                className="col-span-12 w-full md:col-span-6"
                key={items?.key}
              >
                <AdminAutocomplete
                  size={'small'}
                  label={items?.label}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value
                  }
                  onBlur={() => formik.setFieldTouched(items.name, true)}
                  onChange={(e, value) => {
                    formik?.setFieldValue(items.name, value?.value)
                  }}
                  error={Boolean(
                    formik?.touched[items?.name] && formik?.errors[items?.name]
                  )}
                  helperText={
                    formik?.touched[items?.name] &&
                    (formik?.errors[items?.name] as any)
                  }
                  noOptionText={
                    <div className="flex w-full flex-col gap-2">
                      <small className="tracking-wide">No options found</small>
                      {/* <div
                      className="shadow-lg w-fit scale-100 cursor-pointer rounded-md bg-theme px-2 py-1 text-xs font-medium tracking-wide text-white transition-all duration-300 ease-in-out  hover:scale-95 hover:bg-theme/90"
                      // onClick={() =>
                      //   router.push("/panel/admin/transport/manage-vehicle")
                      // }
                    >
                      Add New {items?.label.slice(0, -1)}
                    </div> */}
                    </div>
                  }
                  options={items?.options}
                />
              </div>
            )
          }
          if (items.isMapable === true) {
            return (
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
            )
          }
        })}
      </form>

      <div>
        <table className="mt-10 w-full rounded-lg p-3">
          <tr className=" border-2 border-theme">
            <th className="border-2 border-theme p-3">Items Details</th>
            <th className="border-2 border-theme p-3">Quantity</th>
            <th className="border-2 border-theme p-3">Rate</th>
            <th className="border-2 border-theme p-3">Amount</th>
            <th className="border-2 border-theme p-3">Delete</th>
          </tr>

          {formik?.values?.pricingDetails?.map((item: any, index: number) => (
            <FieldComponent
              key={index}
              id={item.id}
              value={item}
              formik={formik}
              deleteField={deleteField}
            />
          ))}
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

      <div>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <label>Customer Notes</label>
            <br />
            <TextField
              id="outlined-multiline-flexible"
              name="customernote"
              // label="Thanks for your business"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customernote}
              multiline
              rows={4}
              maxRows={10}
              className="mt-2 w-[25rem]"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>
                {formatCurrency(
                  formik?.values?.pricingDetails.reduce(
                    (currentValue: any, acc: any) => {
                      return (
                        Number(acc?.quantity) * Number(acc?.rate) + currentValue
                      )
                    },

                    0
                  )
                )}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p>Discount</p>
              <TextField
                id="outlined-multiline-flexible"
                type="number"
                name="discount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.discount}
                size="small"
              />

              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                size="small"
                name="sign"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sign}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="%">%</MenuItem>
                <MenuItem value="₹">₹</MenuItem>
              </Select>
              <p>
                -{' '}
                {(formik.values.sign === '%' &&
                  formik.values.discount &&
                  formatCurrency(
                    (Number(formik.values.discount) / 100) *
                      formik?.values?.pricingDetails.reduce(
                        (currentValue: any, acc: any) => {
                          return (
                            Number(acc?.quantity) * Number(acc?.rate) +
                            currentValue
                          )
                        },

                        0
                      )
                  )) ||
                  (formik.values.sign === '₹' &&
                    formatCurrency(formik.values.discount)) ||
                  0}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <TextField
                id="outlined-multiline-flexible"
                onChange={formik.handleChange}
                name="Adjustment"
                onBlur={formik.handleBlur}
                value={formik.values.Adjustment}
                size="small"
                placeholder="Adjustment"
              />
              <TextField
                type={'number'}
                id="outlined-multiline-flexible"
                onChange={formik.handleChange}
                name="adjustmentPrice"
                onBlur={formik.handleBlur}
                value={formik.values.adjustmentPrice}
                size="small"
              />
              <p>
                {formatCurrency(Number(formik.values.adjustmentPrice) || 0)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>TCS</p>
              {/* <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="TDS"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="TDS" control={<Radio />} label="TDS" />
                <FormControlLabel value="TCS" control={<Radio />} label="TCS" />
              </RadioGroup> */}

              <div className="w-[70%] p-2">
                {/* <Select
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                  name="tax"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tax}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select> */}
                <AdminAutocomplete
                  size={'small'}
                  // label={items?.label}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value
                  }
                  onChange={(e, value) =>
                    formik?.setFieldValue('tax', value?.value || 0)
                  }
                  noOptionText={
                    <div className="flex w-full flex-col gap-2">
                      <small className="tracking-wide">No options found</small>
                      <div
                        className="shadow-lg w-fit scale-100 cursor-pointer rounded-md bg-theme px-2 py-1 text-xs font-medium tracking-wide text-white transition-all duration-300 ease-in-out  hover:scale-95 hover:bg-theme/90"
                        onClick={() => router.push('/admin/sales/Tcs')}
                      >
                        Add New
                        {/* {items?.label.slice(0, -1)} */}
                      </div>
                    </div>
                  }
                  options={taxes?.map((tax: any) => ({
                    key: tax?.id,
                    label: `${tax?.natureOfCollection} [${tax?.rate}%]`,
                    value: tax?.rate,
                  }))}
                />
              </div>
              <p>
                {formatCurrency(
                  (formik?.values?.tax &&
                    formik?.values?.sign === '%' &&
                    formik?.values?.discount &&
                    (formik?.values?.tax / 100) *
                      (formik?.values?.pricingDetails.reduce(
                        (currentValue: any, acc: any) => {
                          return (
                            Number(acc?.quantity) * Number(acc?.rate) +
                            currentValue
                          )
                        },

                        0
                      ) -
                        (Number(formik.values.discount) / 100) *
                          formik?.values?.pricingDetails.reduce(
                            (currentValue: any, acc: any) => {
                              return (
                                Number(acc?.quantity) * Number(acc?.rate) +
                                currentValue
                              )
                            },

                            0
                          ) +
                        Number(formik.values.adjustmentPrice || 0))) ||
                    (formik?.values?.tax &&
                      formik.values.sign === '₹' &&
                      (Number(formik?.values?.tax) / 100) *
                        (formik?.values?.pricingDetails?.reduce(
                          (currentValue: any, acc: any) => {
                            return (
                              Number(acc?.quantity) * Number(acc?.rate) +
                              currentValue
                            )
                          },
                          0
                        ) -
                          Number(formik?.values?.discount) +
                          Number(formik?.values?.adjustmentPrice || 0))) ||
                    (formik?.values?.tax &&
                      formik?.values?.adjustmentPrice &&
                      (Number(formik?.values?.tax) / 100) *
                        (formik?.values?.pricingDetails?.reduce(
                          (currentValue: any, acc: any) => {
                            return (
                              Number(acc?.quantity) * Number(acc?.rate) +
                              currentValue
                            )
                          },
                          0
                        ) +
                          Number(formik?.values?.adjustmentPrice || 0))) ||
                    (formik?.values?.tax &&
                      formik?.values?.adjustmentPrice &&
                      (Number(formik?.values?.tax) / 100) *
                        formik?.values?.pricingDetails?.reduce(
                          (currentValue: any, acc: any) => {
                            return (
                              Number(acc?.quantity) * Number(acc?.rate) +
                              currentValue
                            )
                          },
                          0
                        )) ||
                    (formik?.values?.tax &&
                      (Number(formik?.values?.tax) / 100) *
                        formik?.values?.pricingDetails?.reduce(
                          (currentValue: any, acc: any) => {
                            return (
                              Number(acc?.quantity) * Number(acc?.rate) +
                              currentValue
                            )
                          },
                          0
                        ))
                ) || 0}
              </p>
            </div>

            <div className="flex justify-between">
              <h1 className="text-xl">Total (₹)</h1>
              <p className="text-xl">{formatCurrency(TotalPrice)}</p>
            </div>
          </div>
        </div>

        <form className="mt-14 flex items-center justify-between">
          <div>
            <label>Terms and Condition</label>
            <br />
            <TextField
              id="outlined-multiline-flexible"
              name="termsandcondition"
              label="Thanks for your business"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.termsandcondition}
              multiline
              rows={4}
              maxRows={10}
              className="mt-2 w-[25rem]"
            />
          </div>

          {/* <div>
            <label>Attached Files to Estimate</label>
            <br />

            <PhotoUpload
              txtName="Upload Your Files"
              variant={'square'}
              // name="AttachedFileToInvoice"
              // onChange={formik.handleChange}
              // value={formik.values.AttachedFileToInvoice}
              value={image}
              onChange={(e: any) => {
                setImage(e)
                formik?.setFieldValue('photo', e?.target?.files[0])
              }}
              className={'mt-4 !w-full !rounded-lg !bg-theme'}
              height={90}
              width={100}
            />
          </div> */}
        </form>
      </div>
      <div className="mt-8 flex w-full justify-end gap-2 px-4">
        <div className="text-end">
          <LoadingButton
            className="shadow-lg btn-background !mt-4 !bg-theme shadow-blue-500/50"
            variant="contained"
            sx={{ color: 'snow' }}
            type="reset"
            onClick={() => {
              formik.resetForm()
            }}
            loadingPosition="start"
            startIcon={<RotateLeft sx={{ color: 'snow' }} />}
          >
            Reset
          </LoadingButton>
        </div>
        <div className="text-end">
          <LoadingButton
            className="shadow-lg btn-background !mt-4 !bg-theme shadow-blue-500/50"
            variant="contained"
            sx={{ color: 'snow' }}
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting || !formik.isValid}
            loading={formik.isSubmitting}
            loadingPosition="center"
            // startIcon={<Done sx={{ color: "snow" }} />}
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}

export default AddInvoiceForm
