import {
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material'
import DrugInputField from '../prescription/DrugInputField'
import { useEffect, useMemo, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import TextInput from 'components/core/TextInput'
// import { database, storage } from 'configs'
import CustomerType from 'types/customer'
import CategoryType from 'types/category'
import { LoadingButton } from '@mui/lab'
import { useFetch } from 'hooks'
import Swal from 'sweetalert2'
import { useGET, useMutation } from 'hooks'
import {
  Add,
  BorderColor,
  Done,
  MedicationLiquid,
  Person,
  Science,
} from '@mui/icons-material'
import * as Yup from 'yup'
import PhotoUpload from 'components/core/PhotoUpload'
import { BASE_URL } from 'configs'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
  activeData?: any
}

const EditHealthIssuesDrawer = ({
  open,
  onClose,
  mutate,
  activeData,
}: Props) => {
  // const { isMutating, trigger } = useMutation(`payment/create`)
  const AddPrescriptionSchema = useMemo(() => {
    return [
      // {
      //   key: '17',
      //   // placeholder: 'Enter your name',
      //   name: 'healthIssue',
      //   label: 'Select Issues *',
      //   placeholder: '',
      //   type: 'select',
      //   styleContact: 'rounded-xl mb-5 bg-white ',
      //   validationSchema: Yup.string().required('Select this field'),
      //   initialValue: activeData?.healthIssue,
      //   icon: <Person />,
      //   required: true,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      //   options: [
      //     {
      //       label: 'General Health Issues',
      //       value: 'General Health Issues',
      //     },
      //     {
      //       label: 'Digestive Problems',
      //       value: 'Digestive Problems',
      //     },
      //     {
      //       label: 'Skin Problems',
      //       value: 'Skin Problems',
      //     },
      //     {
      //       label: 'Eye and Ear Problems',
      //       value: 'Eye and Ear Problems',
      //     },
      //   ],
      // },
      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'healthParticulars',
        label: 'Add New Health issues *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().required('fill this field'),
        initialValue: activeData?.healthParticulars,
        icon: <BorderColor />,
        required: true,
      },
    ]
  }, [activeData])
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
  const { trigger, isMutating } = useMutation(
    `health-particular/update/${activeData?._id}`,
    { method: 'PUT' }
  )

  const handleSend = async (values: any, submitProps: any) => {
    try {
      // console.log(activeData)
      // const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
      // const res = await fetch(
      //   `${BASE_URL}/health-particular/update/${activeData._id}`,
      //   {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //     body: JSON.stringify(values),
      //   }
      // )
      // const data = await res.json()
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

  const [image, setImage] = useState<any>(open?.documentUrl)
  useEffect(() => {
    setImage(open?.documentUrl)
  }, [open?.documentUrl])

  // const handleSend = async (values: any, submitProps: any) => {
  //   console.log(values)
  // }

  // { example: JSON.stringify({amount:values?.amount || activeData?.amount})}
  console.log(activeData)
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
            Edit Report
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {/* <Weekdays /> */}
                {console.log(formik.errors)}
                {AddPrescriptionSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {inputItem?.name === 'photo' ? (
                      <div className="w-full">
                        <FormControl fullWidth>
                          <PhotoUpload
                            txtName="Upload Lab Report"
                            variant={'square'}
                            value={image}
                            onChange={(e: any) => {
                              setImage(e)
                              formik?.setFieldValue(
                                'photo',
                                e?.target?.files[0]
                              )
                            }}
                            className={
                              'mt-4 mb-5 !w-full !rounded-lg !bg-theme'
                            }
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
                      disabled={
                        formik.isSubmitting || !formik.isValid || isMutating
                      }
                      loading={formik.isSubmitting || isMutating}
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

export default EditHealthIssuesDrawer
