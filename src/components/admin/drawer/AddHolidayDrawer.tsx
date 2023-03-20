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

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AddHolidayDrawer = ({ open, onClose, mutate }: Props) => {
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
        // options: [
        //   {
        //     label: 'All',
        //     value: 'All',
        //   },
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
        //     label: 'Thu',
        //     value: 'Thu',
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
      },

      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'slot',
        label: 'Select Slot *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().required('Slot is required'),
        initialValue: '',
        icon: <Transgender />,
        required: true,
        options: [
          {
            label: 'Full day',
            value: 'Full day',
          },
          {
            label: '10:15 AM - 10:30 AM',
            value: '10:15 AM - 10:30 AM',
          },
          {
            label: '10:30 AM - 10:45 AM',
            value: '10:30 AM - 10:45 AM',
          },
          {
            label: '10:45 AM - 11:00 AM',
            value: '10:45 AM - 11:00 AM',
          },
          {
            label: '11:00 AM - 11:15 AM',
            value: '11:00 AM - 11:15 AM',
          },
          {
            label: '11:15 AM - 11:30 AM',
            value: '11:15 AM - 11:30 AM',
          },
          {
            label: '11:30 AM - 11:45 AM',
            value: '11:30 AM - 11:45 AM',
          },
          {
            label: '11:45 AM - 12:00 AM',
            value: '11:45 AM - 12:00 AM',
          },
          {
            label: '12:00 AM - 12:15 PM',
            value: '12:00 AM - 12:15 PM',
          },
          {
            label: '12:15 PM - 12:30 PM',
            value: '12:15 PM - 12:30 PM',
          },
          {
            label: '12:30 PM - 12:45 PM',
            value: '12:30 PM - 12:45 PM',
          },
        ],
      },
    ]
  }, [])

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

  const [image, setImage] = useState<any>()
  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
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
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {console.log(formik.values)}
                {console.log(formik.errors)}
                {console.log(formik.touched)}
                {AddHolidaySchema?.map((inputItem, index) => (
                  <div key={index}>
                    {inputItem.name === 'slot' && 'day' ? (
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
                            formik?.touched[inputItem.name] &&
                            (formik?.errors[inputItem.name] as any)
                          }
                          value={formik?.values[inputItem.name]}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                        />
                      </div>
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
                          name={inputItem?.name}
                          title={inputItem?.label}
                          options={inputItem.options}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem?.type as any}
                          startIcon={inputItem?.icon}
                          // styleContact={inputItem?.styleContact}
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
