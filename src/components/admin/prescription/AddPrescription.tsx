import { Container, Typography } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import TextInput from 'components/core/TextInput'
import DrugInputField from './DrugInputField'
import {
  Add,
  BorderColor,
  Done,
  MedicationLiquid,
  Person,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import { useFetch } from 'hooks'
import CategoryType from 'types/category'
import CustomerType from 'types/customer'
// import { database, storage } from 'configs'
import Swal from 'sweetalert2'

const AddPrescription = () => {
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
        key: '3',
        // placeholder: 'Enter your name',
        name: 'pet',
        label: 'Select Pet *',
        placeholder: '',
        styleContact: 'rounded-xl mb-5 bg-white ',
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
          {
            label: 'Dairy',
            value: 'Dairy',
          },
          {
            label: 'Poultry',
            value: 'Poultry',
          },
          {
            label: 'Fish',
            value: 'Fish',
          },
          {
            label: 'Farm Animal',
            value: 'Farm Animal',
          },
          {
            label: 'Exotic Pet',
            value: 'Exotic Pet',
          },
          ,
        ],
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
        key: '4',
        // placeholder: 'Enter your email',
        name: 'drugName',
        label: 'Drug Name *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.array().required('Item Name is required'),
        initialValue: [{ value: '', amount: '', key: '1' }],
        icon: <MedicationLiquid />,
        required: true,
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
                  {inputItem?.name === 'drugName' ? (
                    <div className=" w-full py-4">
                      {formik.values[inputItem.name]?.length &&
                        formik?.values[inputItem.name]?.map((item: any) => {
                          return (
                            <DrugInputField
                              name="item"
                              error={Boolean(
                                formik?.touched?.drugName &&
                                  formik?.errors?.drugName
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
                    <div className={'py-4'}>
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

export default AddPrescription
