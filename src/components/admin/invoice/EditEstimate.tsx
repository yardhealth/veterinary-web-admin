import { Container, Drawer, Typography } from '@mui/material'
import AddItemSchema from 'schemas/AddItemSchema'
import TextInput from 'components/core/TextInput'
import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import CustomerTypeSelecter from 'components/core/CustomerTypeSelecter'
import TypeSelecter from 'components/core/TypeSelecter'
import UnitSelecter from 'components/core/UnitSelecter'
import { database } from 'configs'
import Swal from 'sweetalert2'
import CustomerType from 'types/customer'
import { useFetch } from 'hooks'
import { AdminAutocomplete } from 'components/core'
import AdminType from 'types/admin'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditEstimateDrawer = ({ open, onClose, mutate }: Props) => {
  const [staffs] = useFetch<any[]>(`/Users`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<any[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  console.log(customers)
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
        validationSchema: Yup.string()
          .required('Customer Name required')
          .min(2, 'Customer Name must be at least 2 characters'),
        initialValues: '',

        options: customers?.map((item: CustomerType) => ({
          label: `${item?.primaryContact} (${item?.email}) `,
          value: `${item?.id}`,
          key: `${item?.id}`,
        })),
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
        name: 'estimate',
        label: 'Estimate Number# *',
        placeholder: 'Enter Estimate Number',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        validationSchema: Yup.string()
          .required('Estimate Number is  required')
          .min(2, 'Estimate Number is must be at least 2 characters'),
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
        isMapable: true,
        name: 'reference',
        label: 'Reference Number#',
        placeholder: 'Enter Reference Number',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'text',
        initialValues: '',
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
        label: 'Salesperson',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'autocomplete',
        initialValues: '',
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: staffs
          ?.filter((staff: AdminType) => staff?.role === 'sales-person')
          ?.map((item: AdminType) => ({
            label: `${item?.displayName} (${item?.email}) `,
            value: `${item?.id}`,
            key: `${item?.id}`,
          })),
      },
      // {
      //   key: '2.9',
      //   isMapable: true,
      //   name: 'projectname',
      //   label: 'Project Name',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   type: 'select',
      //   initialValues: '',
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      //   options: [
      //     { key: 1, label: 'Demo Project', value: 'Demo Project' },
      //     { key: 2, label: 'Dummy Project', value: 'Dummy Project' },
      //   ],
      // },
      {
        key: '4',
        isMapable: true,
        name: 'estimateDate',
        label: 'Estimate Date *',
        placeholder: '28/01/2000',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'date',
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
        key: '5',
        isMapable: true,
        name: 'expiryDate',
        label: 'Expiry Date',
        placeholder: '28/01/2000',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        type: 'date',
        initialValues: '',
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
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
    ]
  }, [customers, staffs])

  console.log(open)
  const initialValues = AddEstimateSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValues
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

  const handleSend = async (values: any, submitProps: any) => {
    try {
      database
        .ref(`Estimates/${open?.id}`)
        .update({ ...values, updatedAt: new Date().toString() })
      database
        .ref(`Customers/${open?.user}/Estimates/${open?.id}`)
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
      <Drawer
        anchor="right"
        open={open?.id}
        onClose={() => onClose && onClose()}
      >
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
            Edit Estimate
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
                    estimate: open?.estimate,
                    reference: open?.reference,
                    salesperson: open?.salesperson,
                    subject: open?.subject,
                    estimateDate: open?.estimateDate,
                    expiryDate: open?.expiryDate,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {AddEstimateSchema?.map((items: any, index) => (
                  <div key={index}>
                    {items?.type === 'autocomplete' ? (
                      <AdminAutocomplete
                        value={{
                          key: formik.values[items?.name],
                          label: items?.options?.find(
                            (value: any) =>
                              value?.value === formik.values[items?.name]
                          )?.label,
                          value: formik.values[items?.name],
                        }}
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
                          // inputItem?.multiline ? "col-span-2 w-full" : "w-full"
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
                          // startIcon={items?.icon}
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
                  <div className="mt-6 mb-4">
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

export default EditEstimateDrawer
