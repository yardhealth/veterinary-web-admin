import { Container, Drawer, Typography } from '@mui/material'
import AddItemSchema from 'schemas/AddItemSchema'
import TextInput from 'components/core/TextInput'
import { CurrencyRupee, Done, Person } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CustomerTypeSelecter from 'components/core/CustomerTypeSelecter'
import TypeSelecter from 'components/core/TypeSelecter'
import UnitSelecter from 'components/core/UnitSelecter'
import { database } from 'configs'
import Swal from 'sweetalert2'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import CustomerType from 'types/customer'
import { useFetch } from 'hooks'
import { AdminAutocomplete } from 'components/core'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditPaymentDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [customers] = useFetch<any[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const EditPaymentSchema = useMemo(() => {
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
        initialValues: '1',
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
  const initialValues = EditPaymentSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValues
      return accumulator
    },
    {} as any
  )
  const validationSchema = EditPaymentSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  const handleSend = async (values: any, submitProps: any) => {
    try {
      database
        .ref(`Payments/${open?.id}`)
        .update({ ...values, updatedAt: new Date().toString() })
      database
        .ref(`Customers/${open?.user}/Payments/${open?.id}`)
        .update({ ...values, updatedAt: new Date().toString() })
      onClose()
      submitProps.resetForm()
      Swal.fire('Success', 'Successfully added', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    }
  }
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: '40vw',
            marginTop: '5vh',
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Edit Payment
          </Typography>
          {/* <div className="mt-4 flex justify-center text-center">
						<PhotoUpload
							variant={"circular"}
							value={image}
							onChange={setImage}
							width={150}
							height={150}
						/>
					</div> */}
          <Formik
            enableReinitialize
            initialValues={
              open?.id
                ? {
                    user: open?.user,
                    amountReceived: open?.amountReceived,
                    paymentDate: open?.paymentDate,
                    paymentMode: open?.paymentMode,
                    paymentNumber: open?.paymentNumber,
                    reference: open?.reference,
                    invoice: open?.invoice,
                    taxDeducted: Number(open?.taxDeducted),
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {EditPaymentSchema?.map((items: any, index) => (
                  <div key={index}>
                    {items?.type === 'autocomplete' ? (
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
                          formik?.touched[items?.name] &&
                            formik?.errors[items?.name]
                        )}
                        helperText={
                          formik?.touched[items?.name] &&
                          (formik?.errors[items?.name] as any)
                        }
                        noOptionText={
                          <div className="flex w-full flex-col gap-2">
                            <small className="tracking-wide">
                              No options found
                            </small>
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
                    ) : (
                      <div
                        className={
                          ''
                          // items?.multiline ? "col-span-2 w-full" : "w-full"
                        }
                      >
                        <TextInput
                          fullWidth
                          key={index}
                          name={items?.name}
                          title={items?.label}
                          options={items.options}
                          // multiline={items?.multiline}
                          // rows={items?.rows}
                          type={items?.type as any}
                          startIcon={items?.icon}
                          // styleContact={items?.styleContact}
                          error={Boolean(
                            formik?.touched[items.name] &&
                              formik?.errors[items.name]
                          )}
                          helperText={formik?.errors[items.name] as string}
                          value={formik?.values[items.name]}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div>
                  <div className="mt-2 mb-2">
                    <LoadingButton
                      className="btn-background !bg-theme"
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting || !formik.isValid}
                      loading={formik.isSubmitting}
                      loadingPosition="start"
                      startIcon={<Done />}
                    >
                      Submit
                    </LoadingButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Drawer>
    </>
  )
}

export default EditPaymentDrawer
