// import { clinics } from "configs";

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import AddNewCategorySchema from 'schemas/AddNewCategorySchema'
import TextInput from 'components/core/TextInput'
import { LoadingButton } from '@mui/lab'
import { Done } from '@mui/icons-material'
// import { database } from 'configs'
import Swal from 'sweetalert2'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGap: '4px',
  borderRadius: '20px',
}

const AnimalSelecter = ({
  name,
  onChange,
  onBlur,
  value,
  defaultValue,
  className,
  options,
  error,
  helperText,
}: any) => {
  // console.log(value, defaultValue)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSend = async (values: any, submitProps: any) => {}
  const initialValues = AddNewCategorySchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddNewCategorySchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )

  return (
    <FormControl fullWidth>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex  flex-col" sx={style}>
          <h1 className="mb-4 text-xl font-bold text-theme">Add New Pet</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {console.log(formik.errors)}
                {AddNewCategorySchema?.map((inputItem: any, index: any) => (
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
                          multiline={inputItem?.multiline}
                          rows={inputItem?.rows}
                          type={inputItem?.type as any}
                          startIcon={inputItem?.icon}
                          // styleContact={inputItem?.styleContact}
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
        </Box>
      </Modal>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between pt-3 font-bold text-theme">
          Select Pet *
          <p
            className="cursor-pointer pr-10 text-sm font-semibold text-theme"
            // onClick={() => router.push(`/panel/admin/patient/add-patient`)}
            onClick={handleOpen}
          >
            Add New Pet +
          </p>
        </div>
        <select
          // defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id=""
          className={`flex w-full gap-3 rounded-lg border  p-3 py-4 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${className}`}
        >
          <option value=""> Choose Pet </option>
          {options?.map((item: any, index: any) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {error ? (
          <FormHelperText className="!text-red-600">
            {helperText}
          </FormHelperText>
        ) : null}
      </div>
    </FormControl>
  )
}

export default AnimalSelecter

// interface CountryType {
//   code: string;
//   label: string;
//   phone: string;
//   suggested?: boolean;
// }
