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
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { LoginSchema } from '../schemas'
import { Formik, Form, Field } from 'formik'
import useAuth from '../hooks/useAuth'
import Link from 'next/link'
// import { useChange, useMutation } from "utils";
import { User } from 'types'
import { LOGO } from 'assets'
import { useChange } from 'utils'
import { useMutation } from 'hooks/useAPI'

const Login = () => {
  const { change } = useChange()
  const { isMutating, trigger } = useMutation(`auth/signin`)
  const router = useRouter()
  const { setUser } = useAuth()

  const handleLogin = async (values: any, submitProps: any) => {
    // console.log(values);
    try {
      const { error, success } = await trigger(values)
      if (error) return Swal.fire('Error', error.message, 'error')

      const user = {
        ...success?.data?.user,
        token: success?.data?.token,
      } as User
      setUser?.(user)
      console.log(user)

      localStorage.setItem('ACCESS_TOKEN', success?.data?.token)

      if (user.role === 'ADMIN')
        return Swal.fire('Welcome Back!', 'Login Successful!', 'success').then(
          () => router.push(`/admin`)
        )

      return
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', 'Invalid login credentials', 'error')
      console.log(error)
    }
  }
  const initialValues = LoginSchema().reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue
    return accumulator
  }, {} as { [key: string]: string })
  const validationSchema = LoginSchema().reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  }, {} as { [key: string]: Yup.StringSchema })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="flex h-screen w-full bg-white">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div>
            <div className="mx-auto w-24 md:w-28">
              <Link href="/">
                <img
                  className="w-full object-contain"
                  src="/veterinaryLogo.png"
                  alt=""
                />
              </Link>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleLogin}
            >
              {(formik) => (
                <Form>
                  <Card className="w-[22rem] px-4 md:w-[40rem]">
                    <CardContent>
                      <div className="flex flex-col place-content-center py-2">
                        <p className="text-center text-xl font-semibold text-theme md:text-2xl">
                          LOGIN
                        </p>
                        <p className="mt-1 text-center text-xs font-thin text-[#DD3350] md:text-sm">
                          Enter your credentials to access your panel
                        </p>
                      </div>
                      {LoginSchema().map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any }
                            field: JSX.IntrinsicAttributes & TextFieldProps
                          }) => (
                            <TextField
                              variant="outlined"
                              size="small"
                              fullWidth
                              margin="normal"
                              label={inputItem.label}
                              type={showPassword ? 'text' : inputItem.type}
                              error={Boolean(
                                props.meta.touched && props.meta.error
                              )}
                              helperText={
                                props.meta.touched && props.meta.error
                              }
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

                      <div className="flex place-content-center py-4">
                        <Button
                          type="submit"
                          disabled={
                            formik.isSubmitting || !formik.isValid || isMutating
                          }
                          variant="contained"
                          color="primary"
                          className="!bg-theme"
                          size="large"
                          startIcon={
                            isMutating ? (
                              <CircularProgress size={16} />
                            ) : (
                              <LoginOutlined />
                            )
                          }
                        >
                          Login
                        </Button>
                      </div>
                      <Link href="/forgot-password">
                        <p className="cursor-pointer text-center text-xs text-theme transition-all duration-200 ease-in-out hover:font-semibold hover:text-youtube md:text-sm">
                          Forgot password ?
                        </p>
                      </Link>
                    </CardContent>
                  </Card>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
