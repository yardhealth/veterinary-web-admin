import { BorderColor, Done, EmailOutlined, Phone } from '@mui/icons-material'
import { Container, Drawer, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import TextInput from 'components/core/TextInput'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useMutation } from 'hooks'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
  activeData?: any
}

const EditOwnerDrawer = ({ open, onClose, mutate, activeData }: Props) => {
  console.log(open)

  const AddScheduleSchema = useMemo(() => {
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
        name: 'phoneNumber',
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
    `appointment-booked-by-admin/admin-update-user/${activeData?._id}`,
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
            Edit Owner
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              activeData?._id
                ? {
                    name: activeData?.name,
                    email: activeData?.email,
                    phoneNumber: activeData?.phoneNumber,
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

export default EditOwnerDrawer
