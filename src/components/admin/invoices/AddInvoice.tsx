import { Container, Typography } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import TextInput from 'components/core/TextInput'
import BillInputField from './BillInputField'
import { useGET, useMutation } from 'hooks'
import { useMemo, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import {
  Add,
  BorderColor,
  ContactPhone,
  CurrencyRupee,
  Done,
  Email,
  MedicationLiquid,
  Percent,
} from '@mui/icons-material'
import { AdminAutocomplete } from 'components/core'
import { useRouter } from 'next/router'

const AddInvoice = () => {
  const router = useRouter()
  const [userdata, setUserdata] = useState<any>({})
  console.log(userdata)
  const { data: userData, mutate: userMutate } =
    useGET<any[]>(`user/getallUsers`)
  console.log(userData)

  const { data: singleUser, mutate: userGet } = useGET<any[]>(
    `prescription/get-pet-details?userId=${userdata?._id}`
  )

  const AddInvoiceSchema = useMemo(() => {
    return [
      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'ownerName',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'autocomplete',
        validationSchema: Yup.string().required('Owner name is required'),
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
        key: '3',
        // placeholder: 'Enter your name',
        name: 'subTotal',
        label: 'Sub Total *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().optional(),
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
        name: 'gst',
        label: 'GST *',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().required('GST is required'),
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
        label: 'Gross Total Excluding GST',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().optional(),
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
        name: 'gstTotal',
        label: 'Gross Total Including GST',
        placeholder: '',
        styleContact: 'rounded-xl bg-white mb-5',
        validationSchema: Yup.string().optional(),
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
  }, [userData?.success?.data?.length, singleUser])

  const { isMutating, trigger } = useMutation(`invoice/create`)

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    const petDetails = singleUser?.success?.data?.find(
      (petDetail) => petDetail?.pet?._id === values?.petName
    )
    console.log(petDetails?.pet?.petName)
    const invoiceData = values.item.map((item: any) => {
      return {
        itemName: `${item.value}`,
        itemAmount: `${item.amount}`,
      }
    })
    const newObject: any = {
      wholeData: invoiceData,
      userName: userdata?.name,
      appointmentId: petDetails?._id,
      petName: petDetails?.pet?.petName,
      pet: petDetails?.pet?._id,
      user: userdata?._id,
      petCategory: petDetails?.pet?.petCategory,
      // userMail: userdata?.email,
      subTotal: values?.subTotal,
      discount: Number(values?.discount),
      grossTotal: values?.grossTotal,
      gst: values?.gst,
      gstTotal: values?.gstTotal,
    }
    console.log(newObject)
    try {
      const { error, success } = await trigger(newObject)
      if (error) return Swal.fire('Error', error.message, 'error')
      const addInvoice = {
        ...success?.data,
      }
      setUserdata('')
      submitProps.resetForm()
      Swal.fire('Success', success.message, 'success')
      console.log(addInvoice)
      router.push('/admin/invoices/all-invoices')
      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Something went wrong', 'error')
      console.log(error)
    }
  }

  // const trail = async () => {
  //   try {
  //     const res = await fetch('https://yardexpress.in/convert-pdf', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: '<h1>Hello world</h1>',
  //     })
  //     const result = await res.json()
  //     console.log(result)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

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
      formik?.setFieldValue(
        'subTotal',
        formik?.values?.item
          ?.map((item: any) => {
            if (item.key === key) {
              return {
                ...item,
                value,
                amount,
              }
            }
            return item
          })
          ?.reduce(
            (accumulator: any, currentValue: any) =>
              accumulator + Number(currentValue?.amount),
            0
          )
      )

      formik?.setFieldValue(
        'grossTotal',
        formik?.values?.discount
          ? formik?.values?.item
              ?.map((item: any) => {
                if (item.key === key) {
                  return {
                    ...item,
                    value,
                    amount,
                  }
                }
                return item
              })
              ?.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + Number(currentValue?.amount),
                0
              ) -
              (formik?.values?.item
                ?.map((item: any) => {
                  if (item.key === key) {
                    return {
                      ...item,
                      value,
                      amount,
                    }
                  }
                  return item
                })
                ?.reduce(
                  (accumulator: any, currentValue: any) =>
                    accumulator + Number(currentValue?.amount),
                  0
                ) *
                formik?.values?.discount) /
                100
          : formik?.values?.item
              ?.map((item: any) => {
                if (item.key === key) {
                  return {
                    ...item,
                    value,
                    amount,
                  }
                }
                return item
              })
              ?.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + Number(currentValue?.amount),
                0
              )
      )

      formik?.setFieldValue(
        'gstTotal',
        formik?.values?.gst
          ? formik?.values?.item
              ?.map((item: any) => {
                if (item.key === key) {
                  return {
                    ...item,
                    value,
                    amount,
                  }
                }
                return item
              })
              ?.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + Number(currentValue?.amount),
                0
              ) -
              (formik?.values?.item
                ?.map((item: any) => {
                  if (item.key === key) {
                    return {
                      ...item,
                      value,
                      amount,
                    }
                  }
                  return item
                })
                ?.reduce(
                  (accumulator: any, currentValue: any) =>
                    accumulator + Number(currentValue?.amount),
                  0
                ) *
                formik?.values?.gst) /
                100
          : formik?.values?.item
              ?.map((item: any) => {
                if (item.key === key) {
                  return {
                    ...item,
                    value,
                    amount,
                  }
                }
                return item
              })
              ?.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + Number(currentValue?.amount),
                0
              )
      )
    } catch (error) {}
  }
  // const a =10
  // const b = 20
  //  a-b===10?a+b : a-b===15?a*b : a/b
  return (
    <Container
      // onClick={() => {
      //   alert('hi')
      //   trail()
      // }}
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
            <Form className="">
              {/* <Weekdays /> */}
              {/* {console.log(formik)} */}
              {console.log(formik.errors)}
              {console.log(formik.values)}
              {AddInvoiceSchema?.map((inputItem: any, index: any) => (
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
                  ) : inputItem?.name === 'item' ? (
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
                        type="button"
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
                        // onChange={formik?.handleChange}
                        onChange={(e: any) => {
                          console.log(e.target.value, inputItem?.name)

                          if (inputItem?.name === 'discount') {
                            formik?.setFieldValue(
                              inputItem?.name,
                              e.target.value
                            )
                            formik?.setFieldValue(
                              'grossTotal',
                              formik?.values?.subTotal -
                                (formik?.values?.subTotal * e.target.value) /
                                  100
                            )
                          } else {
                            formik?.handleChange
                          }
                          if (inputItem?.name === 'gst') {
                            formik?.setFieldValue(
                              inputItem?.name,
                              e.target.value
                            )
                            formik?.setFieldValue(
                              'gstTotal',
                              formik?.values?.grossTotal -
                                (formik?.values?.grossTotal * e.target.value) /
                                  100
                            )
                          } else {
                            formik?.handleChange
                          }
                        }}
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
