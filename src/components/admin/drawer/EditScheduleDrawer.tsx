import CustomerTypeSelecter from 'components/core/CustomerTypeSelecter'
import CountrySelector from 'components/core/CountrySelector'
import {
  Container,
  Drawer,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material'
import AddExpenseSchema from 'schemas/AddExpenseSchema'
import TextInput from 'components/core/TextInput'
import {
  AccessTimeFilled,
  BorderColor,
  CalendarMonth,
  CurrencyRupee,
  Done,
  HistoryToggleOff,
  HourglassBottom,
  Info,
  Person,
  Photo,
  Receipt,
  Timer,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
// import { database, storage } from 'configs'
import CustomerType from 'types/customer'
import Swal from 'sweetalert2'
import PhotoUpload from 'components/core/PhotoUpload'
// import CategorySelecter from 'components/core/CategorySelecter'
import CategoryType from 'types/category'
import { useFetch } from 'hooks'
import Weekdays from 'components/core/Weekdays'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditScheduleDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddScheduleSchema = useMemo(() => {
    return [
      // {
      //   key: '1',
      //   // placeholder: 'Enter your email',
      //   name: 'date',
      //   label: 'Date *',
      //   placeholder: '',
      //   styleContact: 'rounded-lg',
      //   type: 'date',
      //   validationSchema: Yup.string().required('Date is required'),
      //   initialValue: '',
      //   icon: <CalendarMonth />,
      //   required: true,
      // },
      {
        key: '11',
        // placeholder: 'Enter your name',
        name: 'day',
        label: 'Select Day *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).required(
          'Category name is required'
        ),
        initialValue: '',
        type: 'multi-select',
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
            label: 'All',
            value: 'All',
          },
          {
            label: 'Mon',
            value: 'Mon',
          },
          {
            label: 'Tue',
            value: 'Tue',
          },
          {
            label: 'Wed',
            value: 'Wed',
          },
          {
            label: 'Thur',
            value: 'Thur',
          },
          {
            label: 'Fri',
            value: 'Fri',
          },
          {
            label: 'Sat',
            value: 'Sat',
          },
          {
            label: 'Sun',
            value: 'Sun',
          },
          ,
        ],
      },
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'startTime',
        label: 'Start Time *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'time',
        validationSchema: Yup.string().required('Start time is required'),
        initialValue: '',
        icon: <AccessTimeFilled />,
        required: true,
      },
      {
        key: '3',
        // placeholder: 'Enter your email',
        name: 'endTime',
        label: 'End Time *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'time',
        validationSchema: Yup.string().required('End time is required'),
        initialValue: '',
        icon: <AccessTimeFilled />,
        required: true,
      },
      {
        key: '4',
        // placeholder: 'Enter your email',
        name: 'breakTime',
        label: 'Break Time *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'time',
        validationSchema: Yup.string().required('Break time is required'),
        initialValue: '',
        icon: <HistoryToggleOff />,
        required: true,
      },

      {
        key: '6',
        // placeholder: 'Enter your email',
        name: 'intervalPeriod',
        label: 'Interval Period *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'number',
        validationSchema: Yup.string().required('Interval Period is required'),
        initialValue: '',
        icon: <Timer />,
        required: true,
      },
      {
        key: '7',
        // placeholder: 'Enter your email',
        name: 'slotDuration',
        label: 'Slot Duration *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'number',
        validationSchema: Yup.string().required('Slot Duration is required'),
        initialValue: '',
        icon: <HourglassBottom />,
        required: true,
      },
      // {
      //   key: '7',
      //   // placeholder: 'Enter your email',
      //   name: 'slotGap',
      //   label: 'Slot Gap *',
      //   placeholder: '',
      //   styleContact: 'rounded-lg',
      //   type: 'number',
      //   validationSchema: Yup.string().required('Slot Gap is required'),
      //   initialValue: '',
      //   icon: <BorderColor />,
      //   required: true,
      // },
    ]
  }, [categories])
  const initialValues = AddScheduleSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddScheduleSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )
  const [image, setImage] = useState<any>(open?.documentUrl)
  useEffect(() => {
    setImage(open?.documentUrl)
  }, [open?.documentUrl])

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    console.log(image)
    // try {
    //   if (values?.photo && values?.photo != image) {
    //     const fileRef = `Customers/${values?.customerName}/photoUrl`
    //     const res = await storage.ref(fileRef).put(values?.photo)
    //     const url = await res.ref.getDownloadURL()

    //     await database
    //       .ref(`Customers/${values?.customerName}/Expenses/${open?.id}`)
    //       .update({
    //         date: values?.date,
    //         amount: values?.amount,
    //         category: values?.category,
    //         customerName: values?.customerName,
    //         notes: values?.notes,
    //         invoiceNumber: values?.invoiceNumber,
    //         documentUrl: url,
    //         updatedAt: new Date().toString(),
    //       })
    //     await database.ref(`Expenses/${open?.id}`).update({
    //       date: values?.date,
    //       amount: values?.amount,
    //       category: values?.category,
    //       customerName: values?.customerName,
    //       notes: values?.notes,
    //       invoiceNumber: values?.invoiceNumber,
    //       documentUrl: url,
    //       updatedAt: new Date().toString(),
    //     })
    //     onClose()
    //     Swal.fire('Success', 'Successfully Updated', 'success')
    //     submitProps.resetForm()
    //   } else {
    //     await database
    //       .ref(`Customers/${values?.customerName}/Expenses/${open?.id}`)
    //       .update({
    //         ...values,
    //         createdAt: new Date().toString(),
    //       })
    //     await database.ref(`Expenses/${open?.id}`).update({
    //       ...values,
    //       updatedAt: new Date().toString(),
    //     })
    //     onClose()
    //     Swal.fire('Success', 'Successfully Updated', 'success')
    //     submitProps.resetForm()
    //   }
    // } catch (error) {
    //   console.log(error)
    //   Swal.fire('Error', 'Something Went Wrong', 'error')
    //   submitProps.setSubmitting(false)
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
            Edit Schedule
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
                {AddScheduleSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {
                      // inputItem?.name === 'photo' ? (
                      //   <div className="w-full">
                      //     <FormControl fullWidth>
                      //       <PhotoUpload
                      //         txtName="Upload Your Files"
                      //         variant={'square'}
                      //         value={image}
                      //         onChange={(e: any) => {
                      //           setImage(e)
                      //           formik?.setFieldValue(
                      //             'photo',
                      //             e?.target?.files[0]
                      //           )
                      //         }}
                      //         className={'mt-4 !w-full !rounded-lg !bg-theme'}
                      //         height={200}
                      //         width={400}
                      //       />
                      //       {formik?.touched[inputItem.name] &&
                      //         (formik?.errors[inputItem.name] as any) && (
                      //           <FormHelperText className="!text-red-500">
                      //             {formik?.touched[inputItem?.name] &&
                      //               (formik?.errors[inputItem?.name] as any)}
                      //           </FormHelperText>
                      //         )}
                      //     </FormControl>
                      //   </div>
                      // )
                      <div className={'py-3'}>
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
                          // styleContact={inputItem?.styleContact}
                          error={Boolean(
                            formik?.touched[inputItem.name] &&
                              formik?.errors[inputItem.name]
                          )}
                          helperText={
                            formik?.touched[inputItem.name] &&
                            (formik?.errors[inputItem.name] as any)
                          }
                          value={formik?.values[inputItem.name]}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                        />
                      </div>
                    }
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

export default EditScheduleDrawer
