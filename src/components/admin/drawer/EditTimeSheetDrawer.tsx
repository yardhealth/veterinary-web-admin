import { Container, Drawer, Typography } from '@mui/material'
import AddItemSchema from 'schemas/AddItemSchema'
import { AdminAutocomplete, TextInput } from 'components/core'
import { Done, Person } from '@mui/icons-material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
// import { database } from 'configs'
import Swal from 'sweetalert2'
import { useFetch } from 'hooks'
import { useMemo } from 'react'
import CustomerType from 'types/customer'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditTimeSheetDrawer = ({ open, onClose, mutate }: Props) => {
  const [data, isLoading] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
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
  console.log(open)
  const initialValues = AddTimeSheetSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue?.initialValues
      return accumulator
    },
    {} as any
  )

  const validationSchema = AddTimeSheetSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema
      return accumulator
    },
    {} as any
  )
  const [image, setImage] = useState<any>()
  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    // try {
    //   database
    //     .ref(`TimeSheets/${open?.id}`)
    //     .update({ ...values, updatedAt: new Date().toString() })
    //   onClose()
    //   submitProps.resetForm()
    //   Swal.fire('Success', 'Successfully added', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
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
            Edit Time Sheet
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              open?.id
                ? {
                    timeSpent: open?.timeSpent,
                    taskName: open?.taskName,
                    user: open?.user,
                    notes: open?.notes,
                    date: open?.date,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {AddTimeSheetSchema?.map((items) =>
                  items?.type === 'autocomplete' ? (
                    <div
                      className="col-span-12 w-full md:col-span-6"
                      key={items?.key}
                    >
                      <AdminAutocomplete
                        value={{
                          key: formik.values[items?.name],
                          label: items?.options?.find(
                            (value) =>
                              value?.value === formik.values[items?.name]
                          )?.label,
                          value: formik.values[items?.name],
                        }}
                        size={'small'}
                        label={items?.label}
                        isOptionEqualToValue={(option, value) =>
                          option?.value === value?.value
                        }
                        // onBlur={() => formik.setFieldTouched(items.name, true)}
                        onChange={(e, value) =>
                          formik?.setFieldValue('user', value?.value)
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
                        formik?.touched[items?.name] &&
                          formik?.errors[items?.name]
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

export default EditTimeSheetDrawer
