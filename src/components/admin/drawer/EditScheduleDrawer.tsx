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
import { useFetch, useMutation } from 'hooks'
import Weekdays from 'components/core/Weekdays'
import { getHoursAndMinutes } from 'utils'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
  activeData?: any
}

const EditScheduleDrawer = ({ open, onClose, mutate, activeData }: Props) => {
  console.log(open)

  const AddScheduleSchema = useMemo(() => {
    return [
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'startTimeSlot',
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
        name: 'endTimeSlot',
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
        name: 'breakStartTime',
        label: 'Break Start Time *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'time',
        validationSchema: Yup.string().required('Break time is required'),
        initialValue: '',
        icon: <HistoryToggleOff />,
        required: true,
      },
      {
        key: '4',
        // placeholder: 'Enter your email',
        name: 'breakEndTime',
        label: 'Break End Time *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'time',
        validationSchema: Yup.string().required('Break time is required'),
        initialValue: '',
        icon: <HistoryToggleOff />,
        required: true,
      },

      {
        key: '7',
        // placeholder: 'Enter your email',
        name: 'slotDurations',
        label: 'Slot Duration *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'number',
        validationSchema: Yup.string().required('Slot Duration is required'),
        initialValue: '',
        icon: <HourglassBottom />,
        required: true,
      },
    ]
  }, [activeData])
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

  const { trigger, isMutating } = useMutation(
    `slot-management/update-slot-management/${activeData?._id}`,
    { method: 'PATCH' }
  )
  const handleSend = async (values: any, submitProps: any) => {
    try {
      console.log(values)
      const response = await trigger(values)
      if (!response?.success)
        throw new Error(response?.error?.message || 'Something went wrong')
      Swal.fire('Updated Successfully', response?.success?.message, 'success')
      mutate?.()
      submitProps.resetForm()
      onClose()
    } catch (error) {
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
            Edit Schedule
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              activeData?._id
                ? {
                    startTimeSlot: getHoursAndMinutes(
                      new Date(activeData?.startTimeSlot)
                    ),
                    endTimeSlot: getHoursAndMinutes(
                      new Date(activeData?.endTimeSlot)
                    ),
                    breakStartTime: getHoursAndMinutes(
                      new Date(activeData?.breakStartTime)
                    ),
                    breakEndTime: getHoursAndMinutes(
                      new Date(activeData?.breakEndTime)
                    ),

                    slotDurations: activeData?.slotDurations,
                  }
                : initialValues
            }
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
