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
import { database, storage } from 'configs'
import CustomerType from 'types/customer'
import CategoryType from 'types/category'
import { LoadingButton } from '@mui/lab'
import { useFetch } from 'hooks'
import Swal from 'sweetalert2'
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

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditUploadReportDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddPrescriptionSchema = useMemo(() => {
    return [
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'ownerName',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().required('Owner Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        options: [
          {
            label: 'Kate',
            value: 'Kate',
          },
          {
            label: 'James',
            value: 'James',
          },
          {
            label: 'Alex',
            value: 'Alex',
          },
          {
            label: 'Peter',
            value: 'Peter',
          },
        ],
        required: true,
      },

      {
        key: '8',
        // placeholder: 'Enter your email',
        name: 'photo',
        label: 'Upload Lab report *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().required('Lab report is required'),
        initialValue: '',
        icon: <Science />,
        required: true,
      },
    ]
  }, [categories])
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

  const [image, setImage] = useState<any>(open?.documentUrl)
  useEffect(() => {
    setImage(open?.documentUrl)
  }, [open?.documentUrl])

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    console.log(image)
    try {
      if (values?.photo && values?.photo != image) {
        const fileRef = `Customers/${values?.customerName}/photoUrl`
        const res = await storage.ref(fileRef).put(values?.photo)
        const url = await res.ref.getDownloadURL()

        await database
          .ref(`Customers/${values?.customerName}/Expenses/${open?.id}`)
          .update({
            date: values?.date,
            amount: values?.amount,
            category: values?.category,
            customerName: values?.customerName,
            notes: values?.notes,
            invoiceNumber: values?.invoiceNumber,
            documentUrl: url,
            updatedAt: new Date().toString(),
          })
        await database.ref(`Expenses/${open?.id}`).update({
          date: values?.date,
          amount: values?.amount,
          category: values?.category,
          customerName: values?.customerName,
          notes: values?.notes,
          invoiceNumber: values?.invoiceNumber,
          documentUrl: url,
          updatedAt: new Date().toString(),
        })
        onClose()
        Swal.fire('Success', 'Successfully Updated', 'success')
        submitProps.resetForm()
      } else {
        await database
          .ref(`Customers/${values?.customerName}/Expenses/${open?.id}`)
          .update({
            ...values,
            createdAt: new Date().toString(),
          })
        await database.ref(`Expenses/${open?.id}`).update({
          ...values,
          updatedAt: new Date().toString(),
        })
        onClose()
        Swal.fire('Success', 'Successfully Updated', 'success')
        submitProps.resetForm()
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Something Went Wrong', 'error')
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
            Edit Prescription
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

export default EditUploadReportDrawer
