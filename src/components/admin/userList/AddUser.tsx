import {
  AddLocation,
  Apartment,
  BorderColor,
  Done,
  EmailOutlined,
  House,
  LocationCity,
  Person,
  Phone,
  Photo,
  PushPin,
} from '@mui/icons-material'
import PhotoUpload from 'components/core/PhotoUpload'
import TextInput from 'components/core/TextInput'
// import { database, storage } from 'configs'
import CategoryType from 'types/category'
import CustomerType from 'types/customer'
import { useMemo, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useFetch, useMutation } from 'hooks'
import Swal from 'sweetalert2'
import {
  Container,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material'
import * as Yup from 'yup'

const AddUser = () => {
  const { isMutating, trigger } = useMutation(
    `appointment-booked-by-admin/admin-add-user`
  )

  // const [customers] = useFetch<CustomerType[]>(`/Customers`, {
  //   needNested: false,
  //   needArray: true,
  // })
  const AddRecordExpenseSchema = useMemo(() => {
    return [
      {
        key: '12',
        // placeholder: 'Enter your email',
        name: 'name',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'text',
        validationSchema: Yup.string()
          .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            'Name can only contain Latin letters.'
          )
          .required('Owner Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },
      {
        key: '13',
        // placeholder: 'Enter your email',
        name: 'email',
        label: 'Email *',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'text',
        validationSchema: Yup.string()
          .email('Please enter a valid email address')
          .required('Owner Email is required'),
        initialValue: '',
        icon: <EmailOutlined />,
        required: true,
      },
      {
        key: '14',
        // placeholder: 'Enter your email',
        name: 'contactNumber',
        label: 'Contact No *',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'number',
        validationSchema: Yup.string()
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Phone number is invalid'
          )
          .required('Enter phone Number.')
          .min(5, 'Minimum 5 Digits')
          .max(16, 'Maximum 16 Digits'),
        initialValue: '',
        icon: <Phone />,
        required: true,
      },
      {
        key: '15',
        // placeholder: 'Enter your email',
        name: 'houseNumber',
        label: 'House Number',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'text',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <House />,
        required: true,
      },
      {
        key: '16',
        // placeholder: 'Enter your email',
        name: 'apartment',
        label: 'Apartment Number',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'text',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <Apartment />,
        required: true,
      },
      {
        key: '17',
        // placeholder: 'Enter your email',
        name: 'state',
        label: 'State',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'text',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <AddLocation />,
        required: true,
      },
      {
        key: '18',
        // placeholder: 'Enter your email',
        name: 'zipcode',
        label: 'Zip code',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'number',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <PushPin />,
        required: true,
      },
      {
        key: '17',
        // placeholder: 'Enter your email',
        name: 'city',
        label: 'City',
        placeholder: '',
        styleContact: 'rounded-lg mb-10',
        type: 'text',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <LocationCity />,
        required: true,
      },
    ]
  }, [])
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    try {
      const { error, success } = await trigger(values)
      if (error) return Swal.fire('Error', error.message, 'error')

      const addUser = {
        ...success?.data,
      }
      submitProps.resetForm()
      Swal.fire('Success', success.message, 'success')

      console.log(addUser)

      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Invalid login credentials', 'error')
      console.log(error)
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
            <Form className="m-auto">
              {console.log(formik.values)}
              {console.log(formik.errors)}
              {console.log(formik.touched)}

              {AddRecordExpenseSchema?.map((inputItem: any, index: any) => (
                <div key={index} className="w-full">
                  {
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

export default AddUser
