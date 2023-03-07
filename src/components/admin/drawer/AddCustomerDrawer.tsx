import CustomerTypeSelecter from 'components/core/CustomerTypeSelecter'
import CountrySelector from 'components/core/CountrySelector'
import { Container, Drawer, Typography } from '@mui/material'
import AddCustomerSchemas from 'schemas/AddCustomerSchemas'
import TextInput from 'components/core/TextInput'
import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { database } from 'configs'
import CustomerType from 'types/customer'
import Swal from 'sweetalert2'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AddCustomerDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })
  const initialValues = AddCustomerSchemas.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddCustomerSchemas.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )
  const [image, setImage] = useState<any>()
  const handleSend = async (values: any, submitProps: any) => {
    try {
      if (open?.id) {
        database
          .ref(`Customers/${open?.id}`)
          .update({ ...values, updatedAt: new Date().toString() })
      } else {
        database
          .ref(`Customers`)
          .push({ ...values, createdAt: new Date().toString() })
      }
      onClose()
      submitProps.resetForm()
      Swal.fire('Success', 'Successfully added', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
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
            {open?.id ? 'Edit Customer' : 'Add New Customer'}
          </Typography>
          <Formik
            enableReinitialize
            initialValues={
              open?.id
                ? {
                    customer: open?.customer,
                    companyName: open?.companyName ? open?.companyName : '',
                    companyType: open?.companyType,
                    country: open?.country,
                    primaryContact: open?.primaryContact,
                    phoneNumber: open?.phoneNumber,
                    email: open?.email,
                    streetName: open?.streetName,
                    city: open?.city,
                    state: open?.state,
                    pinCode: open?.pinCode,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {console.log(formik.errors)}
                {AddCustomerSchemas?.map((inputItem, index) => (
                  <div key={index}>
                    {inputItem?.name === 'customer' ? (
                      <div className=" w-full py-4">
                        <CustomerTypeSelecter
                          name="customer"
                          options={inputItem.options}
                          error={Boolean(
                            formik?.touched?.customer &&
                              formik?.errors?.customer
                          )}
                          helperText={formik?.errors?.customer}
                          value={formik?.values?.customer}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                        />
                      </div>
                    ) : inputItem?.name === 'country' ? (
                      <div className=" w-full py-4">
                        <CountrySelector
                          countryDetails={countryDetails}
                          setCountryDetails={(value) => {
                            setCountryDetails(value)
                            formik?.setFieldValue('country', value?.label)
                          }}
                          label="Select country"
                        />
                      </div>
                    ) : inputItem?.name === 'companyName' ? (
                      formik?.values?.customer === 'Business' ? (
                        <div className=" w-full py-4">
                          <TextInput
                            fullWidth
                            key={index}
                            name={inputItem?.name}
                            title={inputItem?.label as any}
                            // multiline={inputItem?.multiline}
                            // rows={inputItem?.rows}
                            type={inputItem.type as any}
                            // startIcon={inputItem?.icon}
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
                      ) : null
                    ) : (
                      <div
                        className={
                          ''
                          // inputItem?.multiline ? "col-span-2 w-full" : "w-full"
                        }
                      >
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
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

export default AddCustomerDrawer
