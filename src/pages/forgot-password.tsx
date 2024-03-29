import { Visibility, VisibilityOff, LoginOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { LOGO } from 'assets'
// import { auth, database } from 'configs'
import { Formik, Form, Field } from 'formik'
import { PublicLayout } from 'layouts'
import type { NextPage } from 'next'
import { useState } from 'react'
// import { ForgotPasswordSchema } from 'schemas'
import Swal from 'sweetalert2'
import { User } from 'types'
import * as Yup from 'yup'
import Link from 'next/link'
import ForgotPasswordSchema from 'schemas/ForgotPasswordSchema'

const ForgotPassword: NextPage = () => {
  const handleLogin = async (values: any, submitProps: any) => {
    console.log(values)
    // try {
    //   await auth.sendPasswordResetEmail(values.email)
    //   Swal.fire('success', 'Password Reset Link Sent to your Mail', 'success')
    //   submitProps.resetForm()
    // } catch (err) {
    //   console.log(err)
    //   Swal.fire('Error', `Something Went Wrong`, 'error')
    // }
    // try {
    //   const { user } = await auth.signInWithEmailAndPassword(
    //     values.email,
    //     values.password
    //   )
    //   const snap = await database.ref(`Users/${user?.uid}`).once('value')
    //   const userData = snap?.val() as User
    //   if (userData?.role !== 'admin') {
    //     Swal.fire({
    //       title: 'Oops...',
    //       text: 'You are not an admin',
    //       icon: 'error',
    //     })
    //     return auth.signOut()
    //   }
    //   Swal.fire('Success', 'You have successfully logged in', 'success')
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const initialValues = ForgotPasswordSchema().reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue
      return accumulator
    },
    {} as { [key: string]: string }
  )
  const validationSchema = ForgotPasswordSchema().reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )
  const [showPassword, setShowPassword] = useState(false)
  return (
    <PublicLayout>
      <main className="grid h-[100vh] place-content-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleLogin}
        >
          {(formik) => (
            <Form>
              <>
                <Card className="w-[30vw]">
                  <CardContent>
                    <div className="flex place-content-center py-1">
                      <img src={LOGO} alt="" className="w-52" />
                    </div>
                    {ForgotPasswordSchema().map((inputItem: any) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any }
                          field: JSX.IntrinsicAttributes & TextFieldProps
                        }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label={inputItem.label}
                            type={showPassword ? 'text' : inputItem.type}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {inputItem.startIcon}
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {inputItem.type === 'password' && (
                                    <IconButton
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            {...props.field}
                          />
                        )}
                      </Field>
                    ))}

                    {/* <Link href={'/forgot-password'}>
                      <div className="mx-1 inline cursor-pointer text-center text-sm font-semibold text-[#0E89E2]">
                        Forgot Password
                      </div>
                    </Link> */}
                    <div className="flex place-content-center py-1">
                      <Button
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        variant="contained"
                        color="primary"
                        className="bg-primary"
                        size="large"
                        startIcon={
                          formik.isSubmitting ? (
                            <CircularProgress color="inherit" size={16} />
                          ) : // <LoginOutlined />
                          null
                        }
                      >
                        Forgot Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            </Form>
          )}
        </Formik>
      </main>
    </PublicLayout>
  )
}

export default ForgotPassword
