import React, { useMemo, useState } from 'react'
// import { AddInVoiceSchema } from 'schemas'
import * as Yup from 'yup'
import {
  AccountCircle,
  CurrencyRupee,
  Person,
  Warning,
} from '@mui/icons-material'
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
import { LoadingButton } from '@mui/lab'
import { RotateLeft } from '@mui/icons-material'
import NativeSelect from '@mui/material/NativeSelect'
import { NoTax, Tax } from '../toggleTbl'
import PhotoUpload from 'components/core/PhotoUpload'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import CustomerType from 'types/customer'
import { useFetch } from 'hooks'
import { database } from 'configs'
import Swal from 'sweetalert2'

const AddPaymentForm = () => {
  const [customers] = useFetch<any[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddPaymentSchema = useMemo(() => {
    return [
      {
        key: '1',
        isMapable: false,
        name: 'user',
        label: 'Customer Name *',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
        validationSchema: Yup.string()
          .required('Customer Name required')
          .min(2, 'Customer Name must be at least 2 characters'),
        initialValues: '',
        options: customers?.map((item: CustomerType) => ({
          label: `${item?.primaryContact} (${item?.email}) `,
          value: `${item?.id}`,
          key: `${item?.id}`,
        })),

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
        isMapable: true,
        name: 'amountReceived',
        label: 'Amount Received *',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Amount Received is required'),
        type: 'number',
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
        key: '9.8',
        isMapable: true,
        name: 'paymentDate',
        label: 'Payment Date *',
        placeholder: '28/01/2000',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Payment Date is required'),
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

      // {
      //   key: '5.8',
      //   isMapable: true,
      //   name: 'bankCharges',
      //   label: 'Bank Charges *',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   validationSchema: Yup.string().required('Bank charges is required'),
      //   type: 'number',
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
        key: '2.9',
        isMapable: true,
        name: 'paymentNumber',
        label: 'Payment Number# *',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Payment Number is required'),
        type: 'text',
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
        key: '2.56',
        isMapable: true,
        name: 'paymentMode',
        label: 'Payment Mode',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Payment Mode is required'),
        type: 'select',
        initialValues: '',
        icon: <ReceiptIcon />,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: [
          { key: 1, label: 'Bank Remittance', value: 'Bank Remittance' },
          { key: 2, label: 'Bank Transfer', value: 'Bank Transfer' },
          { key: 3, label: 'Cash', value: 'Cash' },
          { key: 4, label: 'Check', value: 'Check' },
          { key: 4, label: 'Credit Card', value: 'Credit Card' },
        ],
      },
      {
        key: '2.58',
        isMapable: true,
        name: 'invoice',
        label: 'Invoice Number#',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string()
          .required('Invoice No is required')
          .min(2, 'Invoice No is required'),
        type: 'text',
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
        key: '2.58',
        isMapable: true,
        name: 'reference',
        label: 'Reference Number#',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string()
          .required('Referrence No is required')
          .min(2, 'Referrence No is required'),
        type: 'text',
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
      // {
      //   key: '2.67',
      //   isMapable: false,
      //   name: 'taxDeducted',
      //   label: 'Tax Deducted #',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   type: 'radio',
      //   initialValues: '',
      //   icon: <ReceiptIcon />,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      // },
      // {
      //   key: '2.78',
      //   isMapable: false,
      //   name: 'notes',
      //   label: 'Notes',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   validationSchema: Yup.string().required('Fill this field'),
      //   required: true,
      //   type: 'text',
      //   initialValues: '',
      //   icon: <ReceiptIcon />,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      // },
      // {
      //   key: '2.78',
      //   isMapable: false,
      //   name: 'attachedFiles',
      //   label: 'Attached Files',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   type: 'text',
      //   initialValues: '',
      //   icon: <ReceiptIcon />,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      // },
      {
        key: '2.78',
        isMapable: true,
        name: 'taxDeducted',
        label: 'Tax (₹)',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'number',
        initialValues: '',
        icon: <CurrencyRupee />,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
    ]
  }, [customers])

  const initialValues = AddPaymentSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValues
      return accumulator
    },
    {} as any
  )

  const validationSchema = AddPaymentSchema?.reduce(
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
        database.ref(`Payments/${ID}`).update({
          ...values,
          createdAt: new Date().toString(),
        })
        database.ref(`Customers/${values?.user}/Payments/${ID}`).update({
          ...values,
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

  return (
    <div className="pb-10">
      {/* <form className="grid w-full grid-cols-1 gap-4 px-4 pt-10">
        <div>
          <label>Customer Name *</label>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            size="small"
            name="customerName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customerName}
            className="ml-3 w-1/2"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Customer 1">Customer 1</MenuItem>
            <MenuItem value="Customer 2">Customer 2</MenuItem>
          </Select>
        </div>
      </form> */}

      <form className="mt-5 grid w-full grid-cols-12 gap-4 px-4 pt-10">
        {AddPaymentSchema?.map((items: any) => {
          {
            console.log(formik.values)
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
          if (items?.type === 'autocomplete')
            return (
              <div className="col-span-6 w-full">
                <AdminAutocomplete
                  value={
                    formik.values[items?.name]
                      ? {
                          key: formik.values[items?.name],
                          label: items?.options?.find(
                            (value: any) =>
                              value?.value === formik.values[items?.name]
                          )?.label,
                          value: formik.values[items?.name],
                        }
                      : {
                          key: '',
                          label: '',
                          value: '',
                        }
                  }
                  size={'small'}
                  label={items?.label}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value
                  }
                  onBlur={() => formik.setFieldTouched(items.name, true)}
                  onChange={(e, value) =>
                    formik?.setFieldValue(items.name, value?.value)
                  }
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
        })}
      </form>

      {/* <div className="mt-11 flex items-center gap-7"> */}
      {/* <label className="text-xl">Tax deducted ?</label>
        <TextField
          variant="outlined"
          type="number"
          id="outlined-multiline-flexible"
          name="tax"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupee />
              </InputAdornment>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tax}
        /> */}

      {/* <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="No Tax deducted"
          name="radio-buttons-group"
          row
          onChange={toggleTable}
        >
          <FormControlLabel
            value="No Tax deducted"
            control={<Radio />}
            label="No Tax deducted"
          />
          <FormControlLabel
            value="Yes, TDS(Income Tax)"
            control={<Radio />}
            label="Yes, TDS(Income Tax)"
          />
        </RadioGroup> */}
      {/* </div> */}

      {/* <div>
        {element === 'No Tax deducted' ? (
          <>
            <div className="">
              <NoTax />
            </div>
          </>
        ) : (
          <>
            <div>
              <Tax />
            </div>
          </>
        )}
      </div>

      <div className="m-auto flex w-[90%] justify-end p-5">
        <div className="flex w-[50%] flex-col gap-5">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Total</h1>
            <p className="text-lg font-semibold">0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Amount Received</p>
            <p>0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Amount used for Payments</p>
            <p>0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Amount Refunded</p>
            <p>0.00</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Warning className="text-red-600" style={{ fontSize: '17px' }} />
              <p>Amount in Excess</p>
            </div>
            <p>₹ 0.00</p>
          </div>
        </div>
      </div>

      <form className="m-auto w-[90%]">
        <div className="mt-14 flex items-center justify-between">
          <div>
            <label>Notes</label>
            <br />
            <TextField
              id="outlined-multiline-flexible"
              // label="Thanks for your bussiness"
              name="notes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes}
              multiline
              rows={4}
              maxRows={10}
              className="mt-2 w-[25rem]"
            />
          </div>

          <div>
            <label>Attached Files</label>
            <br />
            <PhotoUpload
              txtName="Upload Your Files"
              variant={'square'}
              onChange={formik.handleChange}
              value={formik.values.attachedFiles}
              className={'mt-4 !w-full !rounded-lg !bg-theme px-3'}
              height={90}
              width={100}
            />
          </div>
        </div>
      </form> */}

      <div className="mt-11 flex w-full justify-end gap-2 px-4">
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

export default AddPaymentForm
