import {
  Container,
  Drawer,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material'

import TextInput from 'components/core/TextInput'
import {
  BorderColor,
  Category,
  Class,
  CurrencyRupee,
  Done,
  Photo,
  Scale,
  Transgender,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'

import Swal from 'sweetalert2'
import PhotoUpload from 'components/core/PhotoUpload'
import { useMutation } from 'hooks'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
  activeData?: any
  _id?: any
}

const AddPetDrawer = ({ open, onClose, mutate, activeData, _id }: Props) => {
  console.log(_id)
  // console.log(activeData._id)

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
        icon: <Category />,
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
        icon: <BorderColor />,
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
        icon: <Transgender />,
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
        icon: <Class />,
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
        icon: <BorderColor />,
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
        icon: <Scale />,
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
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Low',
            value: 'LOW',
          },
          {
            label: 'Med',
            value: 'MEDIUM',
          },
          {
            label: 'High',
            value: 'HIGH',
          },

          ,
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
          ,
        ],
      },
      {
        key: '6',
        name: 'petImage',
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

  const { isMutating, trigger } = useMutation(
    `appointment-booked-by-admin/admin-add-pet`,
    {
      isFormData: true,
    }
  )

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    try {
      const formData = new FormData()

      formData.append('petImage', values?.petImage)
      formData.append('userId', _id)
      formData.append('petCategory', values?.petCategory)
      formData.append('petName', values?.petName)
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
      submitProps.resetForm()
      Swal.fire('Success', success.message, 'success')
      setImage('')
      console.log(addPet)
      mutate()
      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Something went wrong', 'error')
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
            Add Pet
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
                {AddScheduleSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {inputItem?.name === 'petImage' ? (
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
                                'petImage',
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

export default AddPetDrawer
