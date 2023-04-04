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
  EmailOutlined,
  HistoryToggleOff,
  HourglassBottom,
  Info,
  Person,
  Phone,
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

const EditPetDrawer = ({ open, onClose, mutate, activeData }: Props) => {
  console.log(activeData)
  const AddScheduleSchema = useMemo(() => {
    return [
      {
        key: '12',
        // placeholder: 'Enter your email',
        name: 'petCategory',
        label: 'Pet Category *',
        placeholder: '',
        styleContact: 'rounded-lg mb-4',
        type: 'text',
        validationSchema: Yup.string().required('Pet Category is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },
      {
        key: '13',
        // placeholder: 'Enter your email',
        name: 'petName',
        label: 'Pet Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-4',
        type: 'text',
        validationSchema: Yup.string().required('Pet Name is required'),
        initialValue: '',
        icon: <EmailOutlined />,
        required: true,
      },
      {
        key: '14',
        // placeholder: 'Enter your email',
        name: 'gender',
        label: 'Gender *',
        placeholder: '',
        styleContact: 'rounded-lg mb-4',
        type: 'select',
        validationSchema: Yup.string().required('Pet Gender is required'),
        initialValue: '',
        icon: <Phone />,
        options: [
          {
            label: 'Male',
            value: 'MALE',
          },
          {
            label: 'Female',
            value: 'FEMALE',
          },

          ,
        ],
        required: true,
      },
      {
        key: '15',
        // placeholder: 'Enter your email',
        name: 'breed',
        label: 'Breed *',
        placeholder: '',
        styleContact: 'rounded-lg mb-4',
        type: 'text',
        validationSchema: Yup.string().required('Pet Breed is required'),
        initialValue: '',
        icon: <Phone />,
        required: true,
      },
      {
        key: '16',
        // placeholder: 'Enter your email',
        name: 'age',
        label: 'Age (Years)*',
        placeholder: '',
        styleContact: 'rounded-lg mb-4',
        type: 'number',
        validationSchema: Yup.string().required('Pet Age is required'),
        initialValue: '',
        icon: <Phone />,
        required: true,
      },
      {
        key: '17',
        // placeholder: 'Enter your email',
        name: 'weight',
        label: 'Weight (kg) *',
        placeholder: '',
        styleContact: 'rounded-lg mb-4',
        type: 'number',
        validationSchema: Yup.string().required('Pet Weight is required'),
        initialValue: '',
        icon: <Phone />,
        required: true,
      },
      {
        key: '9',
        // placeholder: 'Enter your email',
        name: 'aggression',
        label: 'Aggression',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().required('This field is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Low',
            value: 'LOW',
          },
          {
            label: 'MED',
            value: 'MEDIUM',
          },
          {
            label: 'HIGH',
            value: 'HIGH',
          },
        ],
      },
      {
        key: '10',
        // placeholder: 'Enter your email',
        name: 'vaccinated',
        label: 'Vaccinated *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().required('Vaccinated field is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Yes',
            value: 'YES',
          },
          {
            label: 'No',
            value: 'NO',
          },
        ],
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
    `appointment-booked-by-admin/admin-update-pet/${activeData?._id}`,
    { method: 'PUT' }
  )
  // console.log(activeData._id)
  const handleSend = async (values: any, submitProps: any) => {
    try {
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
            Edit Pet
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              activeData?._id
                ? {
                    petCategory: activeData?.petCategory,
                    petName: activeData?.petName,
                    gender: activeData?.gender,
                    breed: activeData?.breed,
                    age: activeData?.age,
                    weight: activeData?.weight,
                    aggression: activeData?.aggression,
                    vaccinated: activeData?.vaccinated,
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

export default EditPetDrawer
