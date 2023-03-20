import { Container, Drawer, Typography } from '@mui/material'
import AddItemSchema from 'schemas/AddItemSchema'
import TextInput from 'components/core/TextInput'
import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import CustomerTypeSelecter from 'components/core/CustomerTypeSelecter'
import TypeSelecter from 'components/core/TypeSelecter'
import UnitSelecter from 'components/core/UnitSelecter'
// import { database } from 'configs'
import Swal from 'sweetalert2'

type Props = {
  open?: boolean | any
  onClose: () => void
  setRealtime?: (value: boolean) => void
  mutate?: any
}

const AddItemDrawer = ({ open, onClose, mutate }: Props) => {
  console.log(open)
  const initialValues = AddItemSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue
    return accumulator
  }, {} as any)
  const validationSchema = AddItemSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  }, {} as { [key: string]: Yup.StringSchema })
  const [image, setImage] = useState<any>()
  const handleSend = async (values: any, submitProps: any) => {
    // try {
    //   database
    //     .ref(`Items`)
    //     .push({ ...values, createdAt: new Date().toString() })
    //   onClose()
    //   submitProps.resetForm()
    //   Swal.fire('Success', 'Successfully added', 'success')
    // } catch (error: any) {
    //   console.log(error)
    //   Swal.fire('Error', error?.message || 'Something Went Wrong', 'error')
    // }
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
            Add New Item
          </Typography>
          {/* <div className="mt-4 flex justify-center text-center">
						<PhotoUpload
							variant={"circular"}
							value={image}
							onChange={setImage}
							width={150}
							height={150}
						/>
					</div> */}
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {AddItemSchema?.map((inputItem, index) => (
                  <div key={index}>
                    {
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
                          options={inputItem.options}
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
                    }
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

export default AddItemDrawer
