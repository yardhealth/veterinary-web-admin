// import BedCategorySelecter from "components/BedCategorySelecter";
import {
  Card,
  Container,
  Typography,
  Box,
  FormControl,
  FormHelperText,
} from '@mui/material'
import AddRecordExpenseSchema from 'schemas/AddRecordExpenseSchema'
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
import RoleSelecter from 'components/core/RoleSelecter'
// import CategorySelecter from 'components/core/CategorySelecter'
import PhotoUpload from 'components/core/PhotoUpload'
import { useFetch } from 'hooks'
import CategoryType from 'types/category'
import CustomerType from 'types/customer'
import { database, storage } from 'configs'
import Swal from 'sweetalert2'
import Weekdays from 'components/core/Weekdays'

const AddSchedule = () => {
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddRecordExpenseSchema = useMemo(() => {
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
      {
        key: '7',
        // placeholder: 'Enter your email',
        name: 'slotGap',
        label: 'Slot Gap *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'number',
        validationSchema: Yup.string().required('Slot Gap is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },
    ]
  }, [categories])
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
      if (values?.photo) {
        const fileRef = `Customers/${values?.customerName}/photoUrl`
        const res = await storage.ref(fileRef).put(values?.photo)
        const url = await res.ref.getDownloadURL()
        const ID = Date.now()
        await database
          .ref(`Customers/${values?.customerName}/Expenses/${ID}`)
          .update({
            date: values?.date,
            amount: values?.amount,
            category: values?.category,
            customerName: values?.customerName,
            notes: values?.notes,
            invoiceNumber: values?.invoiceNumber,
            documentUrl: url,
            createdAt: new Date().toString(),
          })
        await database.ref(`Expenses/${ID}`).update({
          date: values?.date,
          amount: values?.amount,
          category: values?.category,
          customerName: values?.customerName,
          notes: values?.notes,
          invoiceNumber: values?.invoiceNumber,
          documentUrl: url,
          createdAt: new Date().toString(),
        })
        setImage('')
        Swal.fire('Success', 'Successfully Addded', 'success')
        submitProps.resetForm()
      } else {
        await database.ref(`Customers/${values?.customerName}/Expenses`).push({
          ...values,
          createdAt: new Date().toString(),
        })
        await database.ref(`Expenses`).push({
          ...values,
          createdAt: new Date().toString(),
        })
        Swal.fire('Success', 'Successfully Addded', 'success')
        submitProps.resetForm()
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Something Went Wrong', 'error')
      submitProps.setSubmitting(false)
    }
  }
  const initialValues = AddRecordExpenseSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddRecordExpenseSchema?.reduce(
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
              <Weekdays />
              {console.log(formik.errors)}
              {AddRecordExpenseSchema?.map((inputItem: any, index: any) => (
                <div key={index}>
                  {inputItem?.name === 'photo' ? (
                    <div className="w-full">
                      <FormControl fullWidth>
                        <PhotoUpload
                          txtName="Upload Your Files"
                          variant={'square'}
                          value={image}
                          onChange={(e: any) => {
                            setImage(e)
                            formik?.setFieldValue('photo', e?.target?.files[0])
                          }}
                          className={'mt-4 !w-full !rounded-lg !bg-theme'}
                          height={200}
                          width={400}
                        />
                        {formik?.touched[inputItem.name] &&
                          (formik?.errors[inputItem.name] as any) && (
                            <FormHelperText className="!text-red-500">
                              {formik?.touched[inputItem?.name] &&
                                (formik?.errors[inputItem?.name] as any)}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </div>
                  ) : inputItem?.name === 'category' ? (
                    <div className=" w-full py-4">
                      {/* <CategorySelecter
                        name="category"
                        options={inputItem.options}
                        error={Boolean(
                          formik?.touched?.category && formik?.errors?.category
                        )}
                        helperText={formik?.errors?.category}
                        value={formik?.values?.category}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                      /> */}
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
      </div>
    </Container>
  )
}

export default AddSchedule
