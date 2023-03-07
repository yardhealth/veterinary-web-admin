// import BedCategorySelecter from "components/BedCategorySelecter";
import { Card, Container, Typography } from '@mui/material'
import AddUserSchema from 'schemas/AddUserSchema'
import TextInput from 'components/core/TextInput'
import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import AdminLayout from 'layouts/admin'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import RoleSelecter from 'components/core/RoleSelecter'
import { database } from 'firebase-admin'
import Swal from 'sweetalert2'

const CreateUser = () => {
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const handleSend = async (values: any, submitProps: any) => {
    try {
      const apiResponse = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: `${values.displayName}`,
          email: `${values.email}`,
          password: `${values.password}`,
          dbRef: `Users`,
          role: `${values?.role}`,
        }),
      })

      const result = await apiResponse.json()

      if (result?.error) return Swal.fire('Error', result?.message, 'error')
      submitProps.resetForm()
      Swal.fire('Success', 'Successfully added', 'success')
    } catch (error: any) {
      console.log(error)
      Swal.fire('Error', error?.message || 'Error creating staff', 'error')
    }
  }
  const initialValues = AddUserSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddUserSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  }, {} as { [key: string]: Yup.StringSchema })

  return (
    <AdminLayout title="Create user">
      <Container
        maxWidth="xl"
        // style={{
        //   width: '40vw',
        //   marginTop: '5vh',
        // }}
      >
        <Card className="dashboard-card-shadow m-auto w-[50%] border-t-4 border-b-4 border-t-theme border-b-theme  !p-6">
          <Typography
            align="center"
            // color="text.primary"
            variant="h5"
            className="!mt-2 font-bold text-theme"
            sx={{ marginBottom: 3 }}
          >
            Create User
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {console.log(formik.errors)}
                {AddUserSchema?.map((inputItem: any, index: any) => (
                  <div key={index}>
                    {inputItem?.name === 'role' ? (
                      <div className=" w-full py-4">
                        <RoleSelecter
                          name="role"
                          options={inputItem.options}
                          error={Boolean(
                            formik?.touched?.role && formik?.errors?.role
                          )}
                          helperText={formik?.errors?.role}
                          value={formik?.values?.role}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                        />
                      </div>
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
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default CreateUser
