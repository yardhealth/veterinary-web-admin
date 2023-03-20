import { BorderColor, Done, Person, Photo } from '@mui/icons-material'
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

const AddHealthIssues = () => {
  const { isMutating, trigger } = useMutation(`health-particular/create`)
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  // const [customers] = useFetch<CustomerType[]>(`/Customers`, {
  //   needNested: false,
  //   needArray: true,
  // })
  const AddRecordExpenseSchema = useMemo(() => {
    return [
      {
        key: '17',
        // placeholder: 'Enter your name',
        name: 'healthIssue',
        label: 'Select Issues *',
        placeholder: '',
        type: 'select',
        styleContact: 'rounded-xl mb-5 bg-white ',
        validationSchema: Yup.string().required('Select this field'),
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
            label: 'General Health Issues',
            value: 'General Health Issues',
          },
          {
            label: 'Digestive Problems',
            value: 'Digestive Problems',
          },
          {
            label: 'Skin Problems',
            value: 'Skin Problems',
          },
          {
            label: 'Eye and Ear Problems',
            value: 'Eye and Ear Problems',
          },
        ],
      },
      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'healthParticulars',
        label: 'Add New Health issues *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().required('fill this field'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },
    ]
  }, [categories])
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [sign, setSign] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const handleSend = async (values: any, submitProps: any) => {
    try {
      const { error, success } = await trigger(values)
      if (error) return Swal.fire('Error', error.message, 'error')

      const healthIssue = {
        ...success?.data,
      }
      Swal.fire('Success', success.message, 'success')

      console.log(healthIssue)

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
            <Form className="m-auto w-full">
              {console.log(formik.values)}
              {console.log(formik.errors)}
              {console.log(formik.touched)}

              {AddRecordExpenseSchema?.map((inputItem: any, index: any) => (
                <div key={index} className="w-full">
                  {
                    <div className={'w-full'}>
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

export default AddHealthIssues
