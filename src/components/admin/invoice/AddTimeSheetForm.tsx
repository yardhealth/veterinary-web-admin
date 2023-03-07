import React, { useState } from 'react'
// import { AddInVoiceSchema } from 'schemas'
import * as Yup from 'yup'
import { Person } from '@mui/icons-material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Form, Formik, useFormik } from 'formik'
import { AdminAutocomplete, TextInput } from 'components/core'
import { Button, Card } from '@mui/material'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { RotateLeft } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import PhotoUpload from 'components/core/PhotoUpload'
import { useMemo } from 'react'
import { useFetch } from 'hooks'
import CustomerType from 'types/customer'
import { database } from 'configs'
import Swal from 'sweetalert2'

const AddTimeSheetForm = () => {
  const [data, isLoading] = useFetch<CustomerType[]>(`/Customers`, {
    // needNested: false,
    needArray: true,
  })
  console.log(data)

  const AddTimeSheetSchema = useMemo(() => {
    return [
      {
        key: '1',
        name: 'date',
        label: 'Date *',
        styleContact: 'rounded-xl overflow-hidden bg-white',
        type: 'date',
        initialValues: '',
        icon: <Person />,
        validationSchema: Yup.date().required('Date is required*'),
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
        name: 'taskName',
        label: 'Task Name *',
        placeholder: 'Add Task',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        validationSchema: Yup.string().required('Task is required*'),
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
        name: 'timeSpent',
        label: 'Time Spent *',
        placeholder: 'HH:MM',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Time spent is required*'),
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
        key: '4',
        name: 'user',
        label: 'User *',
        placeholder: 'Select User',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
        validationSchema: Yup.string().required('User is required*'),
        required: true,
        initialValues: '',
        icon: <ReceiptIcon />,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: data?.map((item: CustomerType) => ({
          label: `${item?.primaryContact} (${item?.email}) `,
          value: `${item?.id}`,
          key: `${item?.id}`,
        })),
      },
      {
        key: '5',
        name: 'notes',
        label: 'Notes',
        placeholder: 'Add Notes',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        validationSchema: Yup.string()
          .required('Notes required')
          .min(2, 'Notes must be at least 2 characters'),
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
  }, [data])

  const initialValues = AddTimeSheetSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValues
      return accumulator
    },
    {} as any
  )

  const validationSchema = AddTimeSheetSchema?.reduce(
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
    onSubmit: async (values, submitProps) => {
      try {
        database
          .ref(`TimeSheets`)
          .push({ ...values, createdAt: new Date().toString() })
        submitProps.resetForm()
        Swal.fire('Success', 'Successfully added', 'success')
      } catch (error: any) {
        console.log(error)
        Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
      }
    },
  })
  console.log(formik)
  return (
    <div className="pb-10">
      <Card className="dashboard-card-shadow m-auto w-[95%] border-t-4 border-b-4 border-t-theme border-b-theme !p-1">
        <form className="grid w-full grid-cols-12 gap-4 px-4 pt-10">
          {AddTimeSheetSchema?.map((items) =>
            items?.type === 'autocomplete' ? (
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
                    console.log(items?.options)
                    formik?.setFieldValue('user', value?.value)
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
            ) : (
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
          )}
        </form>
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
      </Card>
    </div>
  )
}

export default AddTimeSheetForm
