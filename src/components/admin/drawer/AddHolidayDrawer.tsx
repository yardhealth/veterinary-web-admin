import { Container, Drawer, Typography } from '@mui/material'
// import AddHolidaySchema from 'schemas/AddHolidaySchema'
import TextInput from 'components/core/TextInput'
import {
  AccessTimeFilled,
  BorderColor,
  CurrencyRupee,
  Done,
  HistoryToggleOff,
  HourglassBottom,
  Info,
  LineWeight,
  MergeType,
  Person,
  Timer,
  Transgender,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useState, useMemo } from 'react'
import * as Yup from 'yup'
import CustomerTypeSelecter from 'components/core/CustomerTypeSelecter'
import TypeSelecter from 'components/core/TypeSelecter'
import UnitSelecter from 'components/core/UnitSelecter'
// import { database } from 'configs'
import Swal from 'sweetalert2'
import { useGET, useMutation } from 'hooks'
import moment from 'moment'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate: any
}

const AddHolidayDrawer = ({ open, onClose, mutate }: Props) => {
  const [date, setDate] = useState()
  console.log(date)
  const { data, mutate: dateMutate } = useGET<any[]>(`slot/get?date=${date}`)
  console.log(data)

  const AddHolidaySchema = useMemo(() => {
    return [
      {
        key: '1',
        // placeholder: 'Enter your name',
        name: 'day',
        label: 'Select Day *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.date().required('Day is required'),
        initialValue: '',
        type: 'date',
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
        key: '2d',
        // placeholder: 'Enter your email',
        name: 'fullDay',
        label: 'Do you want full day off ?',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().optional(),
        initialValue: 'No',
        icon: <Transgender />,
        required: true,
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
      },

      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'slot',
        label: 'Select Slot *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().when('fullDay', {
          is: 'No',
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <Transgender />,
        // required: true,
        // options: [
        //   {
        //     label: 'Full day',
        //     value: 'Full day',
        //   },
        //   {
        //     label: '10:15 AM - 10:30 AM',
        //     value: '10:15 AM - 10:30 AM',
        //   },
        //   {
        //     label: '10:30 AM - 10:45 AM',
        //     value: '10:30 AM - 10:45 AM',
        //   },
        //   {
        //     label: '10:45 AM - 11:00 AM',
        //     value: '10:45 AM - 11:00 AM',
        //   },
        //   {
        //     label: '11:00 AM - 11:15 AM',
        //     value: '11:00 AM - 11:15 AM',
        //   },
        //   {
        //     label: '11:15 AM - 11:30 AM',
        //     value: '11:15 AM - 11:30 AM',
        //   },
        //   {
        //     label: '11:30 AM - 11:45 AM',
        //     value: '11:30 AM - 11:45 AM',
        //   },
        //   {
        //     label: '11:45 AM - 12:00 AM',
        //     value: '11:45 AM - 12:00 AM',
        //   },
        //   {
        //     label: '12:00 AM - 12:15 PM',
        //     value: '12:00 AM - 12:15 PM',
        //   },
        //   {
        //     label: '12:15 PM - 12:30 PM',
        //     value: '12:15 PM - 12:30 PM',
        //   },
        //   {
        //     label: '12:30 PM - 12:45 PM',
        //     value: '12:30 PM - 12:45 PM',
        //   },
        // ],
        options: data?.success?.data
          .filter((item) => !item?.isHolidaySlot)
          ?.map((item, i) => {
            return {
              label: `${moment(item?.start).format('LT')} - ${moment(
                item?.end
              ).format('LT')}`,
              value: `${item?.start} - ${item?.end}`,
            }
          }),
      },
    ]
  }, [data?.success?.data?.length, date])

  console.log(open)
  const initialValues = AddHolidaySchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddHolidaySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )
  const { isMutating, trigger } = useMutation(`holiday/create`)
  const [image, setImage] = useState<any>()

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)

    // const date = values.slot.split(' - ')
    // const basicDate = new Date(
    //   moment(values.day).format('MMM DD YYYY')
    // ).toISOString()
    // const startTime = date[0]
    // const endTime = date[1]
    // const formattedDate = new Date(basicDate)

    //fullDay
    const newObject: any =
      values?.fullDay === 'Yes'
        ? { fullDay: new Date(values?.day).toISOString() }
        : {
            holidayDate: new Date(values.day).toISOString(),
            holidayStartTime: new Date(
              new Date(values?.day).getFullYear(),
              new Date(values?.day).getMonth(),
              new Date(values?.day).getDate(),
              new Date(values.slot.split(' - ')[0]).getHours(),
              new Date(values.slot.split(' - ')[0]).getMinutes()
            ).toISOString(),
            holidayEndTime: new Date(
              new Date(values?.day).getFullYear(),
              new Date(values?.day).getMonth(),
              new Date(values?.day).getDate(),
              new Date(values.slot.split(' - ')[1]).getHours(),
              new Date(values.slot.split(' - ')[1]).getMinutes()
            ).toISOString(),
          }
    try {
      const { error, success } = await trigger(newObject)
      console.log(success)
      console.log(error)
      if (error) return Swal.fire('Error', error.message, 'error')
      const slots = {
        ...success?.data,
      }
      mutate() && mutate()
      onClose()
      submitProps.resetForm()
      Swal.fire('Success', success.message, 'success')
      console.log(slots)
      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Invalid Holiday details', 'error')
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
            Add Holiday
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {formik.values?.day &&
                  setDate(new Date(formik.values.day).toISOString() as any)}
                {console.log(formik)}

                {AddHolidaySchema?.map((inputItem, index) => (
                  <div key={index}>
                    {
                      <div
                        className={
                          ''
                          // inputItem?.multiline ? "col-span-2 w-full" : "w-full"
                        }
                      >
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label}
                          options={inputItem.options}
                          disabled={
                            inputItem?.name === 'slot' &&
                            formik.values.fullDay === 'Yes'
                          }
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem?.type as any}
                          startIcon={inputItem?.icon}
                          // styleContact={inputItem?.styleContact}
                          error={Boolean(
                            formik?.touched[inputItem.name] &&
                              formik?.errors[inputItem.name]
                          )}
                          helperText={
                            (formik.values.fullDay === 'No' &&
                              formik?.errors[inputItem.name]) as any
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

export default AddHolidayDrawer
