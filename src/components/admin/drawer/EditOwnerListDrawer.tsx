import { Container, Drawer, Typography } from '@mui/material'
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
import {
  Add,
  BorderColor,
  Call,
  ContactMail,
  Done,
  Email,
  MedicationLiquid,
  Person,
} from '@mui/icons-material'
import * as Yup from 'yup'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const EditOwnerListDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const EditOwnerListSchema = useMemo(() => {
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
        key: '5',
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
        key: '5',
        // placeholder: 'Enter your email',
        name: 'contactNo',
        label: 'Contact No *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'number',
        validationSchema: Yup.number().required('Email Required.'),
        initialValue: '',
        icon: <Call />,
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
    ]
  }, [categories])
  const initialValues = EditOwnerListSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = EditOwnerListSchema?.reduce(
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
            Edit Pet Owner
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
                {EditOwnerListSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {
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
                    }
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

export default EditOwnerListDrawer
