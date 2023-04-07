import { CalendarMonth, Done, LocationCity, Person } from '@mui/icons-material'
import { Container, Drawer, Typography } from '@mui/material'
import AvailableSlot from 'components/core/AvailableSlot'
import { useEffect, useMemo, useState } from 'react'
import TextInput from 'components/core/TextInput'
import { useGET, useMutation } from 'hooks'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import Swal from 'sweetalert2'
import moment from 'moment'
import * as Yup from 'yup'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
  activeData?: any
}

const RescheduleDrawer = ({ open, onClose, mutate, activeData }: Props) => {
  console.log(activeData)
  const [appointmentDate, setAppointmentDate] = useState<any>()
  const { data, mutate: newMutate } = useGET<any[]>(`health-particular/getall`)

  const {
    data: feeData,
    mutate: feeMutate,
    isLoading,
  } = useGET<any[]>(`payment/getall`)
  console.log(feeData)

  const BookAppointmentSchema = useMemo(() => {
    return [
      {
        key: '23',
        // placeholder: 'Enter your email',
        name: 'appointmentDate',
        label: 'Select Appointment Date *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'date',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <CalendarMonth />,
        required: true,
      },
      {
        key: '24',
        name: 'slot',
        label: 'Slot *',
        validationSchema: Yup.string().optional(),
        styleContact: 'rounded-lg mb-5',
        initialValue: '',
        placeholder: 'Slot',
        icon: <LocationCity />,
        required: true,
      },
    ]
  }, [activeData])
  const initialValues = BookAppointmentSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = BookAppointmentSchema?.reduce(
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
    `appointment/reschedule-admin`
    // { method: 'PATCH' }
  )

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)

    const newObject: any = {
      appointmentId: activeData?._id,
      userId: activeData?.user?._id,
      rescheduleDate: new Date(values.appointmentDate).toISOString(),
      rescheduleStartTime: moment(values?.slot?.split('@')[0]).format('HH:mm'),
      rescheduleEndTime: moment(values?.slot?.split('@')[1]).format('HH:mm'),
    }
    console.log(newObject)

    try {
      const { error, success } = await trigger(newObject)
      if (error) return Swal.fire('Error', error.message, 'error')

      const reschedule = {
        ...success?.data,
      }
      submitProps.resetForm()
      setImage('')
      Swal.fire('Success', success.message, 'success')
      mutate?.()
      onClose?.()
      console.log(reschedule)

      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Invalid login credentials', 'error')
      console.log(error)
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
            Reschedule Appointment For{' '}
            <span className="font-semibold text-theme">
              {activeData?.pet?.petName}
            </span>
          </Typography>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {/* <Weekdays /> */}
                {console.log(formik.errors)}
                {console.log(formik.values)}
                {BookAppointmentSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {inputItem?.name === 'slot' ? (
                      <div className="my-5 w-full">
                        <AvailableSlot
                          className="md:grid-cols-4"
                          date={formik.values.appointmentDate}
                          onClick={(value) =>
                            formik?.setFieldValue('slot', value)
                          }
                          value={formik?.values?.slot}
                        />
                      </div>
                    ) : inputItem?.name === 'consultationType5' ? (
                      formik?.values?.consultation === 'Home' ? (
                        <div className=" w-full">
                          <TextInput
                            fullWidth
                            key={index}
                            name={inputItem?.name}
                            title={inputItem?.label as any}
                            // multiline={inputItem?.multiline}
                            // rows={inputItem?.rows}
                            type={inputItem.type as any}
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
                      ) : null
                    ) : inputItem?.name === 'description' ? (
                      formik?.values?.healthIssues?.length &&
                      formik?.values?.healthIssues?.includes('Other') ? (
                        <div className=" w-full">
                          <TextInput
                            fullWidth
                            key={index}
                            name={inputItem?.name}
                            title={inputItem?.label as any}
                            multiline={inputItem?.multiline}
                            rows={inputItem?.rows}
                            type={inputItem.type as any}
                            // startIcon={inputItem?.icon}
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
                      ) : null
                    ) : (
                      <div className={'w-full'}>
                        {setAppointmentDate(formik?.values?.appointmentDate)}
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          options={inputItem.options}
                          title={inputItem?.label}
                          multiline={inputItem?.multiline}
                          inputProps={{
                            min: moment(new Date()).format('YYYY-MM-DD'),
                          }}
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
                        {console.log(formik.values.appointmentDate)}
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

export default RescheduleDrawer
