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
  CalendarMonth,
  CurrencyRupee,
  Done,
  Info,
  Person,
  Photo,
  Receipt,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import AdminLayout from 'layouts/admin'
import { Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import RoleSelecter from 'components/core/RoleSelecter'
import AnimalSelecter from 'components/core/AnimalSelecter'
import PhotoUpload from 'components/core/PhotoUpload'
import { useFetch } from 'hooks'
import CategoryType from 'types/category'
import CustomerType from 'types/customer'
import { database, storage } from 'configs'
import Swal from 'sweetalert2'

const AddAppointment = () => {
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
      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'ownerName',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'text',
        validationSchema: Yup.string().required('Owner name is required'),
        initialValue: '',
        icon: <CalendarMonth />,
        required: true,
      },
      {
        key: '1',
        // placeholder: 'Enter your name',
        name: 'animal',
        label: 'Category Name *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Category name is required'),
        initialValue: '',
        type: 'select',
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
            label: 'Akshya Kumar Rout',
            value: 'Akshya Kumar Rout',
          },
          {
            label: 'Anshuman Agrawal',
            value: 'Anshuman Agrawal',
          },
          {
            label: '	Pabitra Pattnaik',
            value: '	Pabitra Pattnaik',
          },
          ,
        ],
      },

      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'gender',
        label: 'Gender *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().required('Amount is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Male',
            value: 'Male',
          },
          {
            label: 'Female',
            value: 'Female',
          },

          ,
        ],
      },

      {
        key: '3',
        label: 'Invoice Number',
        name: 'invoiceNumber',
        type: 'number',
        validationSchema: Yup.string().required('Invoice Number is required'),
        initialValue: '',
        icon: <Receipt />,
        styleContact: 'rounded-lg',
        required: true,
      },
      {
        key: '5',
        name: 'notes',
        label: 'Notes *',
        placeholder: '',
        type: 'text',
        // styleContact: "rounded-lg",
        validationSchema: Yup.string().required('Note is required'),
        initialValue: '',
        icon: <Info />,
        required: true,
        multiline: true,
        rows: 2,
      },
      {
        key: '1',
        // placeholder: 'Enter your name',
        name: 'customerName',
        label: 'Customer Name *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Type is required'),
        type: 'select',
        initialValue: '',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: customers?.map((item: CustomerType) => ({
          label: `${item?.primaryContact} (${item?.email}) `,
          value: `${item?.id}`,
          key: `${item?.id}`,
        })),
      },
      {
        key: '6',
        name: 'photo',
        label: 'Photo',
        type: 'file',
        placeholder: '',
        styleContact: 'rounded-lg',
        // validationSchema: Yup.string().required('file is required'),
        initialValue: '',
        icon: <Photo />,
        // required: true,
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
                  ) : inputItem?.name === 'animal' ? (
                    <div className=" w-full py-4">
                      <AnimalSelecter
                        name="animal"
                        options={inputItem.options}
                        error={Boolean(
                          formik?.touched?.animal && formik?.errors?.animal
                        )}
                        helperText={formik?.errors?.animal}
                        value={formik?.values?.animal}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                      />
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

export default AddAppointment
