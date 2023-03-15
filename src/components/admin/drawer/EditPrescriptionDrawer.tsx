import { Container, Drawer, Typography } from '@mui/material'
import DrugInputField from '../prescription/DrugInputField'
import { useEffect, useMemo, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import TextInput from 'components/core/TextInput'
import { database, storage } from 'configs'
import CustomerType from 'types/customer'
import CategoryType from 'types/category'
import { LoadingButton } from '@mui/lab'
import { useFetch } from 'hooks'
import Swal from 'sweetalert2'
import {
  Add,
  BorderColor,
  Done,
  MedicationLiquid,
  Person,
} from '@mui/icons-material'
import * as Yup from 'yup'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditPrescriptionDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddPrescriptionSchema = useMemo(() => {
    return [
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'ownerName',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().required('Owner Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        options: [
          {
            label: 'Kate',
            value: 'Kate',
          },
          {
            label: 'James',
            value: 'James',
          },
          {
            label: 'Alex',
            value: 'Alex',
          },
          {
            label: 'Peter',
            value: 'Peter',
          },
        ],
        required: true,
      },
      {
        key: '3',
        // placeholder: 'Enter your name',
        name: 'pet',
        label: 'Select Pet *',
        placeholder: '',
        styleContact: 'rounded-xl mb-5 bg-white ',
        validationSchema: Yup.string().required('Pet is required'),
        initialValue: '',
        type: 'select',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: [
          {
            label: 'Dog',
            value: 'Dog',
          },
          {
            label: 'Cat',
            value: 'Cat',
          },
          {
            label: 'Bird',
            value: 'Bird',
          },
          {
            label: 'Dairy',
            value: 'Dairy',
          },
          {
            label: 'Poultry',
            value: 'Poultry',
          },
          {
            label: 'Fish',
            value: 'Fish',
          },
          {
            label: 'Farm Animal',
            value: 'Farm Animal',
          },
          {
            label: 'Exotic Pet',
            value: 'Exotic Pet',
          },
          ,
        ],
      },
      {
        key: '5',
        // placeholder: 'Enter your email',
        name: 'petName',
        label: 'Pet Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().required('Pet Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },
      {
        key: '4',
        // placeholder: 'Enter your email',
        name: 'drugName',
        label: 'Drug Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.array().required('Item Name is required'),
        initialValue: [{ value: '', amount: '', key: '1' }],
        icon: <MedicationLiquid />,
        required: true,
      },

      // {
      //   key: '3',
      //   // placeholder: 'Enter your name',
      //   name: 'instruction',
      //   label: 'Instruction *',
      //   placeholder: '',
      //   styleContact: 'rounded-xl mb-5 bg-white ',
      //   validationSchema: Yup.string().required('Instruction is required'),
      //   initialValue: '',
      //   type: 'select',
      //   icon: <Person />,
      //   required: true,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      //   options: [
      //     {
      //       label: 'OD (Once A Day / 1-0-0)',
      //       value: 'OD (Once A Day / 1-0-0)',
      //     },
      //     {
      //       label: 'BD (Twice A Day / 1-0-1)',
      //       value: 'BD (Twice A Day / 1-0-1)',
      //     },
      //     {
      //       label: 'TDS (Thrice A Day / 1-1-1)',
      //       value: 'TDS (Thrice A Day / 1-1-1)',
      //     },
      //     {
      //       label: 'Four Times A Day 1-1-1-1',
      //       value: 'Four Times A Day 1-1-1-1',
      //     },
      //     {
      //       label: 'Starts Immediately',
      //       value: 'Starts Immediately',
      //     },
      //     {
      //       label: 'When Required',
      //       value: 'When Required',
      //     },
      //     {
      //       label: 'Before Sleep / 0-0-1',
      //       value: 'Before Sleep / 0-0-1',
      //     },
      //     ,
      //   ],
      // },

      // {
      //   key: '3',
      //   // placeholder: 'Enter your name',
      //   name: 'time',
      //   label: 'Time *',
      //   placeholder: '',
      //   styleContact: 'rounded-xl mb-5 bg-white ',
      //   validationSchema: Yup.string().required('Time is required'),
      //   initialValue: '',
      //   type: 'select',
      //   icon: <Person />,
      //   required: true,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      //   options: [
      //     {
      //       label: 'Before Meal',
      //       value: 'Before Meal',
      //     },
      //     {
      //       label: 'After Meal',
      //       value: 'After Meal',
      //     },

      //     ,
      //   ],
      // },

      // {
      //   key: '6',
      //   // placeholder: 'Enter your email',
      //   name: 'prescriptionNote',
      //   label: 'Prescription Note *',
      //   placeholder: '',
      //   styleContact: 'rounded-lg',
      //   type: 'text',
      //   validationSchema: Yup.string().required(
      //     'Prescription Note is required'
      //   ),
      //   initialValue: '',
      //   icon: <Timer />,
      //   multiline: true,
      //   rows: 2,
      //   required: true,
      // },
    ]
  }, [categories])
  const initialValues = AddPrescriptionSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddPrescriptionSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  const handleClick = (name: string, formik: FormikProps<any>) => {
    try {
      console.log(name)
      formik?.setFieldValue(
        name,
        formik?.values[name]?.length > 0
          ? [
              ...formik?.values[name],
              { key: Date.now(), value: '', amount: '' },
            ]
          : [{ key: Date.now(), value: '', amount: '' }]
      )
    } catch (error) {}
  }

  const handleFormikOnChange = (
    formik: FormikProps<any>,
    amount: any,
    value: any,
    key: string
  ) => {
    try {
      formik?.setFieldValue(
        'drugName',
        formik?.values?.drugName?.map((item: any) => {
          if (item.key === key) {
            return {
              ...item,
              value,
              amount,
            }
          }
          return item
        })
      )
    } catch (error) {}
  }

  const [image, setImage] = useState<any>(open?.documentUrl)
  useEffect(() => {
    setImage(open?.documentUrl)
  }, [open?.documentUrl])

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    console.log(image)
    try {
      if (values?.photo && values?.photo != image) {
        const fileRef = `Customers/${values?.customerName}/photoUrl`
        const res = await storage.ref(fileRef).put(values?.photo)
        const url = await res.ref.getDownloadURL()

        await database
          .ref(`Customers/${values?.customerName}/Expenses/${open?.id}`)
          .update({
            date: values?.date,
            amount: values?.amount,
            category: values?.category,
            customerName: values?.customerName,
            notes: values?.notes,
            invoiceNumber: values?.invoiceNumber,
            documentUrl: url,
            updatedAt: new Date().toString(),
          })
        await database.ref(`Expenses/${open?.id}`).update({
          date: values?.date,
          amount: values?.amount,
          category: values?.category,
          customerName: values?.customerName,
          notes: values?.notes,
          invoiceNumber: values?.invoiceNumber,
          documentUrl: url,
          updatedAt: new Date().toString(),
        })
        onClose()
        Swal.fire('Success', 'Successfully Updated', 'success')
        submitProps.resetForm()
      } else {
        await database
          .ref(`Customers/${values?.customerName}/Expenses/${open?.id}`)
          .update({
            ...values,
            createdAt: new Date().toString(),
          })
        await database.ref(`Expenses/${open?.id}`).update({
          ...values,
          updatedAt: new Date().toString(),
        })
        onClose()
        Swal.fire('Success', 'Successfully Updated', 'success')
        submitProps.resetForm()
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Something Went Wrong', 'error')
      submitProps.setSubmitting(false)
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
            Edit Prescription
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {/* <Weekdays /> */}
                {console.log(formik.errors)}
                {AddPrescriptionSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {inputItem?.name === 'drugName' ? (
                      <div className=" w-full py-4">
                        {formik.values[inputItem.name]?.length &&
                          formik?.values[inputItem.name]?.map((item: any) => {
                            return (
                              <DrugInputField
                                name="item"
                                error={Boolean(
                                  formik?.touched?.drugName &&
                                    formik?.errors?.drugName
                                )}
                                helperText={'This field is required.'}
                                value={item.value}
                                amount={item?.amount}
                                onChange={(amount: any, value: any) =>
                                  handleFormikOnChange(
                                    formik,
                                    amount,
                                    value,
                                    item?.key
                                  )
                                }
                              />
                            )
                          })}

                        <button
                          onClick={() => handleClick(inputItem?.name, formik)}
                          className="mt-5 flex items-center gap-1 rounded-md bg-theme px-4 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:scale-105"
                        >
                          <Add className="!text-[1.3rem]" /> Add More
                        </button>
                      </div>
                    ) : (
                      <div className={''}>
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          options={inputItem.options}
                          title={inputItem?.label}
                          multiline={inputItem?.multiline}
                          rows={inputItem?.rows}
                          type={inputItem?.type as any}
                          startIcon={inputItem?.icon}
                          styleContact={inputItem?.styleContact}
                          error={Boolean(
                            formik?.touched[inputItem.name] &&
                              formik?.errors[inputItem.name]
                          )}
                          helperText={formik?.errors[inputItem.name] as string}
                          value={formik?.values[inputItem.name]}
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
                      className="btn-background !bg-primary"
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

export default EditPrescriptionDrawer
