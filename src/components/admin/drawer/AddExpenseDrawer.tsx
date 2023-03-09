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
  CalendarMonth,
  CurrencyRupee,
  Done,
  Info,
  Person,
  Photo,
  Receipt,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { database, storage } from 'configs'
import CustomerType from 'types/customer'
import Swal from 'sweetalert2'
import PhotoUpload from 'components/core/PhotoUpload'
import CategorySelecter from 'components/core/AnimalSelecter'
import CategoryType from 'types/category'
import { useFetch } from 'hooks'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AddExpenseDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddExpenseSchema = useMemo(() => {
    return [
      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'date',
        label: 'Date *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'date',
        validationSchema: Yup.string().required('Date is required'),
        initialValue: '',
        icon: <CalendarMonth />,
        required: true,
      },
      {
        key: '1',
        // placeholder: 'Enter your name',
        name: 'category',
        label: 'Category Name *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Category name is required'),
        initialValue: '',
        type: 'text',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: categories?.map((item: CategoryType) => ({
          label: `${item?.categoryName} `,
          value: `${item?.id}`,
          key: `${item?.id}`,
        })),
      },

      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'amount',
        label: 'Amount *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'number',
        validationSchema: Yup.string().required('Amount is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
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
        validationSchema: Yup.string().required('file is required'),
        initialValue: '',
        icon: <Photo />,
        required: true,
      },
    ]
  }, [categories])
  const initialValues = AddExpenseSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddExpenseSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )
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
            Edit Expense
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              open?.id
                ? {
                    date: open?.date,
                    category: open?.category,
                    amount: open?.amount,
                    invoiceNumber: open?.invoiceNumber,
                    notes: open?.notes,
                    customerName: open?.customerName,
                    photo: open?.documentUrl,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {console.log(formik.errors)}
                {AddExpenseSchema?.map((inputItem: any, index: any) => (
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
                              formik?.setFieldValue(
                                'photo',
                                e?.target?.files[0]
                              )
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
                        <CategorySelecter
                          name="category"
                          options={inputItem.options}
                          error={Boolean(
                            formik?.touched?.category &&
                              formik?.errors?.category
                          )}
                          helperText={formik?.errors?.category}
                          value={formik?.values?.category}
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
        </Container>
      </Drawer>
    </>
  )
}

export default AddExpenseDrawer
