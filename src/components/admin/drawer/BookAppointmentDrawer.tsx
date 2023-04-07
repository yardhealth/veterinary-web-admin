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

const BookAppointmentDrawer = ({ open, onClose, activeData }: Props) => {
  console.log(activeData)
  const [appointmentDate, setAppointmentDate] = useState<any>()
  const { data, mutate } = useGET<any[]>(`health-particular/getall`)

  const {
    data: feeData,
    mutate: feeMutate,
    isLoading,
  } = useGET<any[]>(`payment/getall`)
  console.log(feeData)

  const BookAppointmentSchema = useMemo(() => {
    return [
      {
        key: '11',
        // placeholder: 'Enter your name',
        name: 'generalHealthIssues',
        label: 'General Health Issues',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
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
        options: data?.success?.data
          ?.filter((item) => item?.healthIssue === 'General Health Issues')
          .map((item, i) => {
            return {
              label: item?.healthParticulars,
              value: item?.healthParticulars,
            }
          }),
      },
      {
        key: '12',
        // placeholder: 'Enter your name',
        name: 'digestiveProblems',
        label: 'Digestive Problems',
        placeholder: '',
        styleContact: 'rounded-xl  bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
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

        options: data?.success?.data
          ?.filter((item) => item?.healthIssue === 'Digestive Problems')
          .map((item, i) => {
            // console.log(item)
            return {
              label: item?.healthParticulars,
              value: item?.healthParticulars,
            }
          }),
      },
      {
        key: '13',
        // placeholder: 'Enter your name',
        name: 'skinProblems',
        label: 'Skin Problems',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
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

        options: data?.success?.data
          ?.filter((item) => item.healthIssue === 'Skin Problems')
          .map((item, i) => {
            // console.log(item)
            return {
              label: item?.healthParticulars,
              value: item?.healthParticulars,
            }
          }),
      },
      {
        key: '14',
        // placeholder: 'Enter your name',
        name: 'eyeAndEarProblems',
        label: 'Eye and Ear Problems',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
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
            label: 'Eye Infection',
            value: 'Eye Infection',
          },
          {
            label: 'Ear Infection',
            value: 'Ear Infection',
          },
          {
            label: 'Swollen Eye',
            value: 'Swollen Eye',
          },
          {
            label: 'Swollen Ear',
            value: 'Swollen Ear',
          },
          {
            label: 'Discharge from Eye',
            value: 'Discharge from Eye',
          },
          {
            label: 'Discharge from Ear',
            value: 'Discharge from Ear',
          },
          {
            label: 'Redness of Eye',
            value: 'Redness of Eye',
          },
          {
            label: 'Smell form Ear',
            value: 'Smell form Ear',
          },
          {
            label: 'Injury in Eye',
            value: 'Injury in Eye',
          },
        ],
      },
      {
        key: '15',
        // placeholder: 'Enter your name',
        name: 'other',
        label: 'Other Problem',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
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
            label: 'Need Antibiotics and Drips',
            value: 'Need Antibiotics and Drips',
          },
          {
            label: 'Regular Dressing',
            value: 'Regular Dressing',
          },
          {
            label: 'Follow-up Treatment',
            value: 'Follow-up Treatment',
          },
          {
            label: 'Ear Cleaning',
            value: 'Ear Cleaning',
          },
          {
            label: 'Swollen Testicles',
            value: 'Swollen Testicles',
          },
          {
            label: 'Blood Test',
            value: 'Blood Test',
          },
          {
            label: 'Nail Clipping',
            value: 'Nail Clipping',
          },
          {
            label: 'Anal Gland Cleaning',
            value: 'Anal Gland Cleaning',
          },
          // {
          //   label: 'Other',
          //   value: 'Other',
          // },
          ,
        ],
      },
      // {
      //   key: '16',
      //   // placeholder: 'Enter your email',
      //   name: 'description',
      //   label: 'Description *',
      //   placeholder: '',
      //   styleContact: 'rounded-lg ',
      //   type: 'text',
      //   validationSchema: Yup.string().when('healthIssues', {
      //     is: 'Other',
      //     then: Yup.string().required('Field required'),
      //     otherwise: Yup.string(),
      //   }),
      //   initialValue: '',
      //   icon: <Info />,
      //   required: true,
      //   multiline: true,
      //   rows: 2,
      // },
      {
        key: '17',
        // placeholder: 'Enter your name',
        name: 'consultation',
        label: 'Consultation Type *',
        type: 'select',
        placeholder: '',
        styleContact: 'rounded-xl mb-5 bg-white ',
        validationSchema: Yup.string().required('Customer Type is required'),
        initialValue: '',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: feeData?.success?.data.map((item, i) => {
          return {
            label: item?.label,
            value: item?._id,
          }
        }),
      },

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
      {
        key: '25',
        // placeholder: 'Enter your name',
        name: 'paymentMethod',
        label: 'Payment Method *',
        type: 'select',
        placeholder: '',
        styleContact: 'rounded-xl mb-5',
        validationSchema: Yup.string().required('Payment method is required'),
        initialValue: '',
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
            label: 'Cash',
            value: 'CASH',
          },

          {
            label: 'UPI',
            value: 'ONLINE',
          },
        ],
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

  const { isMutating, trigger } = useMutation(
    `appointment-booked-by-admin/create`
  )

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)

    let wholeData: {
      healthIssue: string
      healthIssueParticular: string
    }[] = []

    if (values?.digestiveProblems) {
      values?.digestiveProblem?.forEach((element: string) => {
        wholeData.push({
          healthIssue: 'digestiveProblems',
          healthIssueParticular: element,
        })
      })
    }
    if (values?.eyeAndEarProblems) {
      values?.eyeAndEarProblems?.forEach((element: string) => {
        wholeData.push({
          healthIssue: 'eyeAndEarProblems',
          healthIssueParticular: element,
        })
      })
    }
    if (values?.generalHealthIssues) {
      values?.generalHealthIssues?.forEach((element: string) => {
        wholeData.push({
          healthIssue: 'eyeAndEarProblems',
          healthIssueParticular: element,
        })
      })
    }
    if (values?.skinProblems) {
      values?.skinProblems?.forEach((element: string) => {
        wholeData.push({
          healthIssue: 'skinProblems',
          healthIssueParticular: element,
        })
      })
    }
    if (values?.other) {
      values?.other?.forEach((element: string) => {
        wholeData.push({
          healthIssue: 'other',
          healthIssueParticular: element,
        })
      })
    }
    const newObject: any = {
      petId: activeData._id,
      userId: activeData.user,
      wholeData: wholeData,
      consultation: values.consultation,
      appointDate: new Date(values.appointmentDate).toISOString(),
      appointStartTime: moment(values?.slot?.split('@')[0]).format('HH:mm'),
      appointEndTime: moment(values?.slot?.split('@')[1]).format('HH:mm'),
      paymentMethod: values.paymentMethod,
    }
    console.log(newObject)

    try {
      const { error, success } = await trigger(newObject)
      if (error) return Swal.fire('Error', error.message, 'error')

      const addAppointment = {
        ...success?.data,
      }
      submitProps.resetForm()
      setImage('')
      Swal.fire('Success', success.message, 'success')
      onClose?.()
      console.log(addAppointment)

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
            Book Appointment For{' '}
            <span className="font-semibold text-theme">
              {activeData?.petName}
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

export default BookAppointmentDrawer
