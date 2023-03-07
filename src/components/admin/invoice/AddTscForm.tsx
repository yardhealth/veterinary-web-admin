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
import Swal from 'sweetalert2'
import { database } from 'configs'

const AddTcsForm = () => {
  const AddTscSchema = [
    {
      key: '1',
      name: 'natureOfCollection',
      label: 'Nature Of Collection *',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'autocomplete',
      validationSchema: Yup.string().required(
        'Nature of Collection is required'
      ),
      initialValues: '',
      required: true,
      options: [
        {
          key: 1,
          label: '206C(6CA) - Alcoholic liquor for human consumption',
          value: '206C(6CA) - Alcoholic liquor for human consumption',
        },
        {
          key: 2,
          label: '206C(6CB) - Timber obtained forest lease',
          value: '206C(6CB) - Timber obtained forest lease',
        },
        {
          key: 3,
          label:
            '206C(6CC) - Timber obtained by any mode other than forest lease',
          value:
            '206C(6CC) - Timber obtained by any mode other than forest lease',
        },
        {
          key: 4,
          label:
            '206C(6CD) - Any other forest produce (not being tendu leaves)',
          value:
            '206C(6CD) - Any other forest produce (not being tendu leaves)',
        },
        { key: 5, label: '206C(6CE) Scrap', value: '206C(6CE) Scrap' },
        {
          key: 6,
          label: '206C(6CF) Parking lots',
          value: '206C(6CF) Parking lots',
        },
        {
          key: 7,
          label: '206C(6CG) Toll plaza',
          value: '206C(6CG) Toll plaza',
        },
        {
          key: 8,
          label: '206C(6CG) Toll plaza',
          value: '206C(6CG) Toll plaza',
        },
        {
          key: 9,
          label: '206C(6CH) Mine or quarry',
          value: '206C(6CH) Mine or quarry',
        },
        {
          key: 10,
          label: '206C(6CI) Tendu leaves',
          value: '206C(6CI) Tendu leaves',
        },
        {
          key: 11,
          label:
            '206C(6CJ) - Sales of minerals, being coal or lignite or iron core',
          value:
            '206C(6CJ) - Sales of minerals, being coal or lignite or iron core',
        },
        {
          key: 12,
          label: '206C(6CK) - Cash sale of bullion and jewellery',
          value: '206C(6CK) - Cash sale of bullion and jewellery',
        },
        {
          key: 13,
          label: '206C(6CL) - Sale of motor vehicle',
          value: '206C(6CL) - Sale of motor vehicle',
        },
        {
          key: 14,
          label: '206C(6CO) - Purchase of overseas tour program package',
          value: '206C(6CO) - Purchase of overseas tour program package',
        },
        {
          key: 15,
          label:
            '206C(6CP) - Education loan taken from financial institution mentioned in section 80E',
          value:
            '206C(6CP) - Education loan taken from financial institution mentioned in section 80E',
        },
        {
          key: 16,
          label:
            '206C(6CQ) - Remittance under LRS for purpose other than for purpose of overseas tour package or for educational loan taken from financial institution',
          value:
            '206C(6CQ) - Remittance under LRS for purpose other than for purpose of overseas tour package or for educational loan taken from financial institution',
        },
        {
          key: 17,
          label: '206C(1H) - Sale of goods',
          value: '206C(1H) - Sale of goods',
        },
      ],
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
    {
      key: '2',
      name: 'rate',
      label: 'Rate(%) *',
      placeholder: 'Enter Rate',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      type: 'number',
      validationSchema: Yup.string().required('Rate  required'),
      initialValues: '',
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
      name: 'taxName',
      label: 'Tax Name *',
      styleContact: 'rounded-xl overflow-hidden bg-white ',
      validationSchema: Yup.string().required('TaxName is required'),
      initialValues: '',
      required: true,
      contactField: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
    },
  ]

  const initialValues = AddTscSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValues
    return accumulator
  }, {} as any)

  const validationSchema = AddTscSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema
    return accumulator
  }, {} as any)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values, submitProps) => {
      try {
        database
          .ref(`Taxes`)
          .push({ ...values, createdAt: new Date().toString() })
        submitProps.resetForm()
        Swal.fire('Success', 'Successfully added', 'success')
      } catch (error: any) {
        console.log(error)
        Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
      }
    },
  })

  return (
    <div className="pb-10">
      <form className="grid w-full grid-cols-12 gap-4 px-4 pt-10">
        {AddTscSchema?.map((items) =>
          items?.type === 'autocomplete' ? (
            <div className="col-span-12 w-full md:col-span-6" key={items?.key}>
              <AdminAutocomplete
                size={'small'}
                label={items?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.value
                }
                onChange={(e, value) => (
                  console.log(value),
                  formik?.setFieldValue('natureOfCollection', value?.value)
                )}
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
    </div>
  )
}

export default AddTcsForm
