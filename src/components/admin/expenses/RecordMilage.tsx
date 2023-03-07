// import BedCategorySelecter from "components/BedCategorySelecter";
import {
  Card,
  Container,
  Typography,
  Box,
  FormControl,
  FormHelperText,
} from '@mui/material'
import AddRecordMilageSchemas from 'schemas/AddRecordMilageSchemas'
import TextInput from 'components/core/TextInput'
import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import AdminLayout from 'layouts/admin'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import RoleSelecter from 'components/core/RoleSelecter'
import CategorySelecter from 'components/core/CategorySelecter'
import PhotoUpload from 'components/core/PhotoUpload'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const RecordMilage = () => {
  const [articleValue, setArticleValue] = useState('')
  const [image, setImage] = useState<any>('')
  const [countryDetails, setCountryDetails] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  })

  const handleSend = async (values: any, submitProps: any) => {
    console.log(values)
    const formData = new FormData()
    formData.append('title', values?.title)
    formData.append('description', values?.description)
    image?.target?.files[0] && formData.append('image', image?.target?.files[0])
  }
  const initialValues = AddRecordMilageSchemas.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddRecordMilageSchemas.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )

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
              {console.log(formik.errors)}
              {AddRecordMilageSchemas?.map((inputItem: any, index: any) => (
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
                            formik?.setFieldValue('photo', e?.target?.files[0])
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
              <div className="flex items-center">
                <Checkbox {...label} />
                <p>Billable</p>
              </div>
              <PhotoUpload
                txtName="Upload Your Files"
                variant={'square'}
                value={image}
                onChange={setImage}
                className={'mt-4 !w-full !rounded-lg !bg-theme'}
                height={200}
                width={100}
              />

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
      </div>
    </Container>
  )
}

export default RecordMilage
