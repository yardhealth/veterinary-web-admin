import PhotoUpload from 'components/core/PhotoUpload'
import { AdminAutocomplete } from 'components/core'
import { Form, Formik, FormikProps } from 'formik'
import TextInput from 'components/core/TextInput'
import { useGET, useMutation } from 'hooks'
import { useMemo, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import Swal from 'sweetalert2'
import {
  BorderColor,
  ContactPhone,
  Done,
  Email,
  Photo,
} from '@mui/icons-material'
import {
  Container,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const AddReport = () => {
  const router = useRouter()
  const [userdata, setUserdata] = useState<any>({})
  console.log(userdata)
  const { data: userData, mutate: userMutate } =
    useGET<any[]>(`user/getallUsers`)
  console.log(userData)

  const { data: singleUser, mutate: userGet } = useGET<any[]>(
    `prescription/get-pet-details?userId=${userdata?._id}`
  )
  console.log(singleUser)

  const AddPrescriptionSchema = useMemo(() => {
    return [
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'ownerName',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'autocomplete',
        validationSchema: Yup.string().required('Owner Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        options: userData?.success?.data?.map((item, i) => {
          return {
            data: item,
            label: `${item?.name} (${item?.email})`,
            value: item?._id,
            key: item?.name,
          }
        }),
        required: true,
      },

      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'email',
        label: 'Email *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string()
          .required('Email Required.')
          .email('Enter valid email'),
        initialValue: '',
        icon: <Email />,
        required: true,
      },
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'phoneNumber',
        label: 'Contact Number *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'number',
        validationSchema: Yup.string().required('Contact number is required'),
        initialValue: '',
        icon: <ContactPhone />,
        required: true,
      },

      {
        key: '4',
        label: 'Pet Name',
        name: 'petName',
        type: 'autocomplete',
        validationSchema: Yup.string().required('Pet Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        styleContact: 'rounded-lg mb-5',

        options: singleUser?.success?.data?.map((item, i) => {
          return {
            label: `${item?.pet?.petName} (${item?.pet?.petCategory})`,
            value: item?.pet?._id,
            key: item?.pet?._id,
          }
        }),
        required: true,
      },

      {
        key: '6',
        name: 'reportPhoto',
        label: 'Pet Image',
        type: 'file',
        placeholder: '',
        styleContact: 'rounded-lg',
        validationSchema: Yup.string().required('file is required'),
        initialValue: '',
        icon: <Photo />,
        required: true,
      },
    ]
  }, [userData?.success?.data?.length, singleUser])
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const { isMutating, trigger } = useMutation(`report/create`, {
    isFormData: true,
  })

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    try {
      const petDetails = singleUser?.success?.data?.find(
        (petDetail) => petDetail?.pet?._id === values?.petName
      )
      console.log(petDetails)
      console.log(petDetails?._id)
      const formData = new FormData()

      formData.append('userId', userdata?._id)
      formData.append('petId', petDetails?.pet?._id)
      formData.append('reportPhoto', values?.reportPhoto)
      formData.append('appointmentId', petDetails?._id)
      formData.append('gender', values?.gender)
      formData.append('breed', values?.breed)
      formData.append('age', values?.age)
      formData.append('weight', values?.weight)
      formData.append('aggression', values?.aggression)
      formData.append('vaccinated', values?.vaccinated)

      const { error, success } = await trigger(formData as any)
      if (error) return Swal.fire('Error', error.message, 'error')

      const addPet = {
        ...success?.data,
      }
      setUserdata('')
      submitProps.resetForm()
      Swal.fire('Success', success.message, 'success')
      router.push('/admin/reports/view-all-reports')
      // console.log(values)

      // console.log(addPet)
      // mutate()
      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Invalid login credentials', 'error')
      console.log(error)
    }
  }
  const initialValues = AddPrescriptionSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddPrescriptionSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  const handleClick = (name: string, formik: FormikProps<any>) => {
    try {
      console.log(name)
      formik?.setFieldValue(
        name,
        formik?.values[name]?.length > 0
          ? [
              ...formik?.values[name],
              { key: Date.now(), value: '', amount: '' },
            ]
          : [{ key: Date.now(), value: '', amount: '' }]
      )
    } catch (error) {}
  }

  const handleFormikOnChange = (
    formik: FormikProps<any>,
    amount: any,
    value: any,
    key: string
  ) => {
    try {
      formik?.setFieldValue(
        'drugName',
        formik?.values?.drugName?.map((item: any) => {
          if (item.key === key) {
            return {
              ...item,
              value,
              amount,
            }
          }
          return item
        })
      )
    } catch (error) {}
  }

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
          enableReinitialize
          initialValues={{
            ...initialValues,
            email: userdata?.email,
            phoneNumber: userdata?.phoneNumber,
            ownerName: userdata?._id,
          }}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form>
              {/* <Weekdays /> */}
              {console.log(formik.errors)}
              {AddPrescriptionSchema?.map((inputItem: any, index: any) => (
                <div key={index}>
                  {inputItem?.type === 'autocomplete' ? (
                    <div className=" w-full pb-4">
                      <AdminAutocomplete
                        size={'medium'}
                        label={inputItem?.label}
                        isOptionEqualToValue={(option, value) =>
                          option?.value === value?.value
                        }
                        error={Boolean(
                          formik?.touched[inputItem?.name] &&
                            formik?.errors[inputItem?.name]
                        )}
                        helperText={
                          formik?.touched[inputItem?.name] &&
                          (formik?.errors[inputItem?.name] as any)
                        }
                        onChange={(e, value) => {
                          console.log(value?.value, inputItem?.name)
                          formik?.setFieldValue(inputItem?.name, value?.value)
                          inputItem?.name === 'ownerName' &&
                            setUserdata(value?.data)
                        }}
                        options={inputItem?.options}
                        noOptionText={
                          <div className="flex w-full flex-col gap-2">
                            <small className="tracking-wide">
                              No options found
                            </small>
                          </div>
                        }
                      />
                    </div>
                  ) : inputItem?.name === 'reportPhoto' ? (
                    <div className="">
                      <FormControl
                        fullWidth
                        className="flex w-full items-center justify-center"
                      >
                        <PhotoUpload
                          txtName="Upload Your Profile Photo"
                          variant={'square'}
                          value={image}
                          onChange={(e: any) => {
                            setImage(e)
                            formik?.setFieldValue(
                              'reportPhoto',
                              e?.target?.files[0]
                            )
                          }}
                          className={
                            'mt-4 mb-5 flex !w-1/2 !rounded-lg !bg-theme'
                          }
                          height={200}
                          width={40}
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
                  ) : (
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
                  )}
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

export default AddReport
