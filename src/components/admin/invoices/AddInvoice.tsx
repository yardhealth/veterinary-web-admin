import { Container, Typography } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import TextInput from 'components/core/TextInput'
import BillInputField from './BillInputField'
// import { database, storage } from 'configs'
import { useMemo, useState } from 'react'
import CustomerType from 'types/customer'
import CategoryType from 'types/category'
import { LoadingButton } from '@mui/lab'
import { useFetch } from 'hooks'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import {
  Add,
  BorderColor,
  CurrencyRupee,
  Done,
  MedicationLiquid,
  Percent,
  Person,
} from '@mui/icons-material'

const AddInvoice = () => {
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddInvoiceSchema = useMemo(() => {
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
        icon: <BorderColor />,
        required: true,
      },
      {
        key: '3',
        // placeholder: 'Enter your name',
        name: 'pet',
        label: 'Select Pet *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5 ',
        validationSchema: Yup.string().required('Pet is required'),
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
            label: 'Dog',
            value: 'Dog',
          },
          {
            label: 'Cat',
            value: 'Cat',
          },
          {
            label: 'Bird',
            value: 'Bird',
          },
          ,
        ],
      },

      {
        key: '4',
        // placeholder: 'Enter your email',
        name: 'item',
        label: 'Item Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.array().required('Item Name is required'),
        //
        initialValue: [{ value: '', amount: '', key: '1' }],
        icon: <MedicationLiquid />,
        required: true,
      },
      {
        key: '5',
        // placeholder: 'Enter your email',
        name: 'petName',
        label: 'Pet Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().required('Pet Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },

      {
        key: '3',
        // placeholder: 'Enter your name',
        name: 'suTotal',
        label: 'Sub Total *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().required('Sub Total is required'),
        initialValue: '',
        type: 'number',
        icon: <CurrencyRupee />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        key: '3',
        // placeholder: 'Enter your name',
        name: 'discount',
        label: 'Discount *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().required('Discount is required'),
        initialValue: '',
        type: 'number',
        icon: <Percent />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },

      {
        key: '3',
        // placeholder: 'Enter your name',
        name: 'grossTotal',
        label: 'Gross Total *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().required('Gross Total is required'),
        initialValue: '',
        type: 'number',
        icon: <CurrencyRupee />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        key: '3',
        // placeholder: 'Enter your name',
        name: 'depositedAmount',
        label: 'Deposited Amount *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().required('Deposited Amount is required'),
        initialValue: '',
        type: 'number',
        icon: <CurrencyRupee />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
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
    // try {
    //   if (values?.photo) {
    //     const fileRef = `Customers/${values?.customerName}/photoUrl`
    //     const res = await storage.ref(fileRef).put(values?.photo)
    //     const url = await res.ref.getDownloadURL()
    //     const ID = Date.now()
    //     await database
    //       .ref(`Customers/${values?.customerName}/Expenses/${ID}`)
    //       .update({
    //         date: values?.date,
    //         amount: values?.amount,
    //         category: values?.category,
    //         customerName: values?.customerName,
    //         notes: values?.notes,
    //         invoiceNumber: values?.invoiceNumber,
    //         documentUrl: url,
    //         createdAt: new Date().toString(),
    //       })
    //     await database.ref(`Expenses/${ID}`).update({
    //       date: values?.date,
    //       amount: values?.amount,
    //       category: values?.category,
    //       customerName: values?.customerName,
    //       notes: values?.notes,
    //       invoiceNumber: values?.invoiceNumber,
    //       documentUrl: url,
    //       createdAt: new Date().toString(),
    //     })
    //     setImage('')
    //     Swal.fire('Success', 'Successfully Added', 'success')
    //     submitProps.resetForm()
    //   } else {
    //     await database.ref(`Customers/${values?.customerName}/Expenses`).push({
    //       ...values,
    //       createdAt: new Date().toString(),
    //     })
    //     await database.ref(`Expenses`).push({
    //       ...values,
    //       createdAt: new Date().toString(),
    //     })
    //     Swal.fire('Success', 'Successfully Added', 'success')
    //     submitProps.resetForm()
    //   }
    // } catch (error) {
    //   console.log(error)
    //   Swal.fire('Error', 'Something Went Wrong', 'error')
    //   submitProps.setSubmitting(false)
    // }
  }
  const initialValues = AddInvoiceSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddInvoiceSchema?.reduce(
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
        'item',
        formik?.values?.item?.map((item: any) => {
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
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form className="">
              {/* <Weekdays /> */}
              {console.log(formik)}
              {AddInvoiceSchema?.map((inputItem: any, index: any) => (
                <div key={index}>
                  {inputItem?.name === 'item' ? (
                    <div className=" w-full py-4">
                      {formik.values[inputItem.name]?.length &&
                        formik?.values[inputItem.name]?.map((item: any) => {
                          return (
                            <BillInputField
                              name="item"
                              error={Boolean(
                                formik?.touched?.item && formik?.errors?.item
                              )}
                              helperText={'This field is required.'}
                              value={item.value}
                              amount={item?.amount}
                              onChange={(amount: any, value: any) =>
                                handleFormikOnChange(
                                  formik,
                                  amount,
                                  value,
                                  item?.key
                                )
                              }
                            />
                          )
                        })}

                      <button
                        onClick={() => handleClick(inputItem?.name, formik)}
                        className="mt-5 flex items-center gap-1 rounded-md bg-theme px-4 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:scale-105"
                      >
                        <Add className="!text-[1.3rem]" /> Add More
                      </button>
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

export default AddInvoice
