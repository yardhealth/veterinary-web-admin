// import BedCategorySelecter from "components/BedCategorySelecter";
import {
  Card,
  Container,
  Typography,
  Box,
  FormControl,
  FormHelperText,
} from '@mui/material'
// import AddScheduleSchema from 'schemas/AddScheduleSchema'
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
import AdminLayout from 'layouts/admin'
import { Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import { useGET, useMutation } from 'hooks'
import moment from 'moment'
import Swal from 'sweetalert2'

const AddSchedule = () => {
  const { data, mutate } = useGET<any[]>(`slot-management/getall`)
  console.log(data)

  const { isMutating, trigger } = useMutation(`slot-management/create`)

  const AddScheduleSchema = useMemo(() => {
    return [
      {
        key: '11',
        // placeholder: 'Enter your name',
        name: 'day',
        label: 'Select Day *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
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
        date: true,
        // options: [
        //   {
        //     label: 'Mon',
        //     value: 'Mon',
        //   },
        //   {
        //     label: 'Tue',
        //     value: 'Tue',
        //   },
        //   {
        //     label: 'Wed',
        //     value: 'Wed',
        //   },
        //   {
        //     label: 'Thur',
        //     value: 'Thur',
        //   },
        //   {
        //     label: 'Fri',
        //     value: 'Fri',
        //   },
        //   {
        //     label: 'Sat',
        //     value: 'Sat',
        //   },
        //   {
        //     label: 'Sun',
        //     value: 'Sun',
        //   },
        //   ,
        // ],
        options: data?.success?.data?.map((item, i) => {
          const days = new Date(item).toLocaleDateString('en-US', {
            weekday: 'long',
          })
          return {
            label: moment(item).format('dddd'),
            value: item,
          }
        }),
      },
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'startTimeSlot',
        label: 'Clinic Open Time *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'time',
        validationSchema: Yup.string().required('Start time is required'),
        initialValue: '',
        icon: <AccessTimeFilled />,
        required: true,
      },
      {
        key: '3',
        // placeholder: 'Enter your email',
        name: 'endTimeSlot',
        label: 'Clinic Close Time *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'time',
        validationSchema: Yup.string().required('End time is required'),
        initialValue: '',
        icon: <AccessTimeFilled />,
        required: true,
      },
      {
        key: '4',
        // placeholder: 'Enter your email',
        name: 'breakStartTime',
        label: 'Break Start Time *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'time',
        validationSchema: Yup.string().required('Break start time is required'),
        initialValue: '',
        icon: <HistoryToggleOff />,
        required: true,
      },

      {
        key: '6',
        // placeholder: 'Enter your email',
        name: 'breakEndTime',
        label: 'Break End Time *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'time',
        validationSchema: Yup.string().required('Break end time is required'),
        initialValue: '',
        icon: <Timer />,
        required: true,
      },
      {
        key: '7',
        // placeholder: 'Enter your email',
        name: 'slotDurations',
        label: 'Slot Duration(mins) *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'number',
        validationSchema: Yup.number()
          .min(1)
          .max(60)
          .required('Slot Duration is required'),
        initialValue: '',
        icon: <HourglassBottom />,
        required: true,
      },
      // {
      //   key: '7',
      //   // placeholder: 'Enter your email',
      //   name: 'slotGap',
      //   label: 'Slot Gap(mins) *',
      //   placeholder: '',
      //   styleContact: 'rounded-lg mb-5',
      //   type: 'number',
      //   validationSchema: Yup.number()
      //     .min(1)
      //     .max(60)
      //     .required('Slot Gap is required'),
      //   initialValue: '',
      //   icon: <BorderColor />,
      //   required: true,
      // },
    ]
  }, [data?.success?.data?.length])
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)

    try {
      const { error, success } = await trigger(values)
      if (error) return Swal.fire('Error', error.message, 'error')

      const slots = {
        ...success?.data,
      }
      submitProps.resetForm()
      Swal.fire('Success', success.message, 'success')

      console.log(slots)

      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Invalid login credentials', 'error')
      console.log(error)
    }
  }

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

  return (
    <Container
      maxWidth="xl"
      // style={{
      //   width: '40vw',
      //   marginTop: '5vh',
      // }}
    >
      <Typography
        align="center"
        // color="text.primary"
        variant="h5"
        className="!mt-2 font-bold text-theme"
        sx={{ marginBottom: 3 }}
      >
        {/* Create User */}
      </Typography>

      <div className="m-auto w-[50vw]">
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
                    <div className={''}>
                      <TextInput
                        fullWidth
                        key={index}
                        name={inputItem?.name}
                        options={inputItem.options}
                        date={inputItem.date}
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
      </div>
    </Container>
  )
}

export default AddSchedule
