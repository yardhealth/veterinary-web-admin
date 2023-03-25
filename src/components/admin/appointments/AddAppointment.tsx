// import BedCategorySelecter from "components/BedCategorySelecter";
import React, { useEffect } from 'react'

import {
  Card,
  Container,
  Typography,
  Box,
  FormControl,
  FormHelperText,
} from '@mui/material'
import AddRecordExpenseSchema from 'schemas/AddRecordExpenseSchema'
import TextInput from 'components/core/TextInput'
import {
  AddRoad,
  Apartment,
  BorderColor,
  CalendarMonth,
  ContactPhone,
  CurrencyRupee,
  Done,
  Email,
  House,
  Info,
  LineWeight,
  LocationCity,
  LocationOn,
  MergeType,
  Person,
  Photo,
  PushPin,
  Receipt,
  Transgender,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import AdminLayout from 'layouts/admin'
import { Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import PhotoUpload from 'components/core/PhotoUpload'
import Swal from 'sweetalert2'
import ConsultationTypeSelecter from './ConsultationTypeSelecter'
import AvailableSlot from 'components/core/AvailableSlot'
import OwnerSelecter from './OwnerSelecter'
import { useGET, useMutation } from 'hooks'
import { AdminAutocomplete } from 'components/core'

const AddAppointment = () => {
  const [userdata, setUserdata] = useState<any>({})
  console.log(userdata)
  const [name, setName] = useState<any>({})
  console.log(name)

  const { data, mutate } = useGET<any[]>(`health-particular/getall`)

  const { data: userData, mutate: userMutate } =
    useGET<any[]>(`user/getallUsers`)
  const { data: singleUser, mutate: userGet } = useGET<any[]>(
    `user/get-user-pet?id=${userdata?._id}`
  )
  console.log(singleUser)

  const { data: petDetails, mutate: getPetDetails } = useGET<any[]>(
    `user/get-pet-by-name?id=${userdata?._id}&petName=${name}`
  )
  console.log(petDetails)

  const AddRecordExpenseSchema = useMemo(() => {
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
        key: '3',
        // placeholder: 'Enter your name',
        name: 'pet',
        label: 'Choose Pet *',
        placeholder: '',
        styleContact: 'rounded-xl mb-10 bg-white ',
        validationSchema: Yup.string().required('field is required'),
        initialValue: '',
        type: 'autocomplete',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        // options: [
        //   {
        //     label: 'Dog',
        //     value: 'Dog',
        //   },
        //   {
        //     label: 'Cat',
        //     value: 'Cat',
        //   },
        //   {
        //     label: 'Bird',
        //     value: 'Bird',
        //   },
        //   {
        //     label: 'Dairy',
        //     value: 'Dairy',
        //   },
        //   {
        //     label: 'Poultry',
        //     value: 'Poultry',
        //   },
        //   {
        //     label: 'Fish',
        //     value: 'Fish',
        //   },
        //   {
        //     label: 'Farm Animal',
        //     value: 'Farm Animal',
        //   },
        //   {
        //     label: 'Exotic Pet',
        //     value: 'Exotic Pet',
        //   },
        //   ,
        // ],
        options: singleUser?.success?.data?.map((item, i) => {
          return {
            label: item?.petCategory,
            value: item?._id,
            key: item?._id,
          }
        }),
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
            label: item?.petName,
            value: item?._id,
            key: item?._id,
          }
        }),
        required: true,
      },

      {
        key: '5',
        // placeholder: 'Enter your email',
        name: 'gender',
        label: 'Gender *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().required('Pet Gender is required'),
        initialValue: '',
        icon: <Transgender />,
        required: true,
        options: [
          {
            label: 'Male',
            value: 'MALE',
          },
          {
            label: 'Female',
            value: 'FEMALE',
          },
          ,
        ],
      },

      {
        key: '6',
        name: 'breed',
        label: 'Breed *',
        placeholder: '',
        type: 'text',
        styleContact: 'rounded-lg mb-5',
        validationSchema: Yup.string().required('Breed is required'),
        initialValue: '',
        icon: <MergeType />,
        required: true,
      },
      {
        key: '7',
        name: 'age',
        label: 'Age *',
        placeholder: '',
        type: 'number',
        styleContact: 'rounded-lg mb-5',
        validationSchema: Yup.string().required('Age is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
        // multiline: true,
        // rows: 2,
      },
      {
        key: '8',
        name: 'wt',
        label: 'Weight',
        placeholder: '',
        type: 'number',
        styleContact: 'rounded-lg mb-5',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <LineWeight />,
        required: true,
        // multiline: true,
        // rows: 2,
      },
      {
        key: '9',
        // placeholder: 'Enter your email',
        name: 'aggression',
        label: 'Aggression',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Low',
            value: 'LOW',
          },
          {
            label: 'Med',
            value: 'MED',
          },
          {
            label: 'High',
            value: 'HIGH',
          },

          ,
        ],
      },
      {
        key: '10',
        // placeholder: 'Enter your email',
        name: 'vaccinated',
        label: 'Vaccinated *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'select',
        validationSchema: Yup.string().required('Vaccinated field is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Yes',
            value: 'YES',
          },
          {
            label: 'No',
            value: 'NO',
          },
          ,
        ],
      },
      {
        key: '11',
        // placeholder: 'Enter your name',
        name: 'generalHealthIssues',
        label: 'General Health Issues',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
        initialValue: '',
        type: 'multi-select',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
        options: data?.success?.data
          ?.filter((item) => item?.healthIssue === 'General Health Issues')
          .map((item, i) => {
            return {
              label: item?.healthParticulars,
              value: item?.healthParticulars,
            }
          }),
      },
      {
        key: '12',
        // placeholder: 'Enter your name',
        name: 'digestiveProblems',
        label: 'Digestive Problems',
        placeholder: '',
        styleContact: 'rounded-xl  bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
        initialValue: '',
        type: 'multi-select',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },

        options: data?.success?.data
          ?.filter((item) => item?.healthIssue === 'Digestive Problems')
          .map((item, i) => {
            // console.log(item)
            return {
              label: item?.healthParticulars,
              value: item?.healthParticulars,
            }
          }),
      },
      {
        key: '13',
        // placeholder: 'Enter your name',
        name: 'skinProblems',
        label: 'Skin Problems',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
        initialValue: '',
        type: 'multi-select',
        icon: <Person />,
        required: true,
        contactField: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },

        options: data?.success?.data
          ?.filter((item) => item.healthIssue === 'Skin Problems')
          .map((item, i) => {
            // console.log(item)
            return {
              label: item?.healthParticulars,
              value: item?.healthParticulars,
            }
          }),
      },
      {
        key: '14',
        // placeholder: 'Enter your name',
        name: 'eyeAndEarProblems',
        label: 'Eye and Ear Problems',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
        initialValue: '',
        type: 'multi-select',
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
            label: 'Eye Infection',
            value: 'Eye Infection',
          },
          {
            label: 'Ear Infection',
            value: 'Ear Infection',
          },
          {
            label: 'Swollen Eye',
            value: 'Swollen Eye',
          },
          {
            label: 'Swollen Ear',
            value: 'Swollen Ear',
          },
          {
            label: 'Discharge from Eye',
            value: 'Discharge from Eye',
          },
          {
            label: 'Discharge from Ear',
            value: 'Discharge from Ear',
          },
          {
            label: 'Redness of Eye',
            value: 'Redness of Eye',
          },
          {
            label: 'Smell form Ear',
            value: 'Smell form Ear',
          },
          {
            label: 'Injury in Eye',
            value: 'Injury in Eye',
          },
        ],
      },
      {
        key: '15',
        // placeholder: 'Enter your name',
        name: 'healthIssues',
        label: 'Other Problem',
        placeholder: '',
        styleContact: 'rounded-xl bg-white ',
        validationSchema: Yup.array(Yup.string()).optional(),
        initialValue: '',
        type: 'multi-select',
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
            label: 'Need Antibiotics and Drips',
            value: 'Need Antibiotics and Drips',
          },
          {
            label: 'Regular Dressing',
            value: 'Regular Dressing',
          },
          {
            label: 'Follow-up Treatment',
            value: 'Follow-up Treatment',
          },
          {
            label: 'Ear Cleaning',
            value: 'Ear Cleaning',
          },
          {
            label: 'Swollen Testicles',
            value: 'Swollen Testicles',
          },
          {
            label: 'Blood Test',
            value: 'Blood Test',
          },
          {
            label: 'Nail Clipping',
            value: 'Nail Clipping',
          },
          {
            label: 'Anal Gland Cleaning',
            value: 'Anal Gland Cleaning',
          },
          {
            label: 'Other',
            value: 'Other',
          },
          ,
        ],
      },
      {
        key: '16',
        // placeholder: 'Enter your email',
        name: 'description',
        label: 'Description *',
        placeholder: '',
        styleContact: 'rounded-lg ',
        type: 'text',
        validationSchema: Yup.string().when('healthIssues', {
          is: 'Other',
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <Info />,
        required: true,
        multiline: true,
        rows: 2,
      },
      {
        key: '17',
        // placeholder: 'Enter your name',
        name: 'consultation',
        label: 'Consultation Type *',
        type: 'select',
        placeholder: '',
        styleContact: 'rounded-xl mb-5 bg-white ',
        validationSchema: Yup.string().required('Customer Type is required'),
        initialValue: '',
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
            label: 'Home',
            value: 'Home',
          },
          {
            label: 'Clinic Visit',
            value: 'Clinic Visit',
          },
        ],
      },
      {
        key: '18',
        // placeholder: 'Enter your email',
        name: 'address1',
        label: 'House/Flat/Floor No. *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().optional(),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <House />,
        required: true,
      },
      {
        key: '19',
        // placeholder: 'Enter your email',
        name: 'address2',
        label: 'Apartment/Road/Area *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().optional(),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <AddRoad />,
        required: true,
      },
      {
        key: '20',
        // placeholder: 'Enter your email',
        name: 'address3',
        label: 'State *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().optional(),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <LocationOn />,
        required: true,
      },
      {
        key: '21',
        // placeholder: 'Enter your email',
        name: 'address4',
        label: 'Zip Code *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'number',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().optional(),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <PushPin />,
        required: true,
      },
      {
        key: '22',
        // placeholder: 'Enter your email',
        name: 'consultationType5',
        label: 'City *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().optional(),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <LocationCity />,
        required: true,
      },

      {
        key: '23',
        // placeholder: 'Enter your email',
        name: 'date',
        label: 'Select Appointment Date *',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        type: 'date',
        validationSchema: Yup.string().optional(),
        initialValue: '',
        icon: <CalendarMonth />,
        required: true,
      },
      {
        key: '24',
        name: 'slot',
        label: 'City *',
        validationSchema: Yup.string().optional(),
        styleContact: 'rounded-lg mb-5',
        initialValue: '',
        placeholder: 'City',
        icon: <LocationCity />,
        required: true,
      },

      {
        key: '25',
        // placeholder: 'Enter your name',
        name: 'payment',
        label: 'Payment Method *',
        type: 'select',
        placeholder: '',
        styleContact: 'rounded-xl mb-5',
        validationSchema: Yup.string().required('Payment method is required'),
        initialValue: '',
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
            label: 'Cash',
            value: 'Cash',
          },
          {
            label: 'Card',
            value: 'Card',
          },
          {
            label: 'UPI',
            value: 'UPI',
          },
          {
            label: 'Others',
            value: 'Others',
          },
        ],
      },

      {
        key: '26',
        name: 'photo',
        label: 'Photo',
        type: 'file',
        placeholder: '',
        styleContact: 'rounded-lg mb-5',
        validationSchema: Yup.string().required('file is required'),
        initialValue: '',
        icon: <Photo />,
        // required: true,
      },
    ]
  }, [
    data?.success?.data?.length,
    userData?.success?.data?.length,
    userdata,
    singleUser,
  ])
  const [image, setImage] = useState<any>('')
  const [date, setDate] = useState()

  const handleSend = async (values: any, submitProps: any) => {}
  const initialValues = AddRecordExpenseSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue
      return accumulator
    },
    {} as any
  )
  const validationSchema = AddRecordExpenseSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as any
  )

  return (
    <Container maxWidth="xl">
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
        <OwnerSelecter />
        <Formik
          enableReinitialize
          initialValues={
            (userdata?._id as any)
              ? {
                  ...initialValues,
                  email: userdata?.email,
                  phoneNumber: userdata?.phoneNumber,
                  gender: petDetails?.success?.data[0]?.gender,
                  breed: petDetails?.success?.data[0]?.breed,
                  age: petDetails?.success?.data[0]?.age,
                  wt: petDetails?.success?.data[0]?.weight,
                  aggression: petDetails?.success?.data[0]?.aggression,
                  vaccinated: petDetails?.success?.data[0]?.vaccinated,
                }
              : initialValues
          }
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form>
              {/* {console.log(formik.values)}
              {console.log(formik.errors)}
              {console.log(formik.touched)} */}

              {AddRecordExpenseSchema?.map((inputItem: any, index: any) => (
                <div key={index}>
                  {inputItem?.name === 'slot' ? (
                    <div className="my-5 w-full">
                      <AvailableSlot className="md:grid-cols-4" />
                    </div>
                  ) : inputItem?.name === 'photo' ? (
                    <div className="w-full">
                      <FormControl fullWidth>
                        <PhotoUpload
                          txtName="Upload Your Pet Photo"
                          variant={'square'}
                          value={image}
                          onChange={(e: any) => {
                            setImage(e)
                            formik?.setFieldValue('photo', e?.target?.files[0])
                          }}
                          className={'mt-4 mb-5 !w-full !rounded-lg !bg-theme'}
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
                  ) : inputItem?.type === 'autocomplete' ? (
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
                          formik?.setFieldValue(inputItem?.name, value?.value)
                          inputItem?.name === 'ownerName' &&
                            setUserdata(value?.data)
                          inputItem?.name === 'petName' && setName(value?.label)
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
                  ) : inputItem?.name === 'consultation' ? (
                    <div className=" w-full py-4">
                      <ConsultationTypeSelecter
                        name="consultation"
                        options={inputItem.options}
                        error={Boolean(
                          formik?.touched?.consultation &&
                            formik?.errors?.consultation
                        )}
                        helperText={formik?.errors?.consultation}
                        value={formik?.values?.consultation}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        styleContact={inputItem?.styleContact}
                      />
                    </div>
                  ) : inputItem?.name === 'address1' ? (
                    formik?.values?.consultation === 'Home' ? (
                      <div className=" w-full">
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label as any}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem.type as any}
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
                    ) : null
                  ) : inputItem?.name === 'address2' ? (
                    formik?.values?.consultation === 'Home' ? (
                      <div className=" w-full">
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label as any}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem.type as any}
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
                    ) : null
                  ) : inputItem?.name === 'address3' ? (
                    formik?.values?.consultation === 'Home' ? (
                      <div className=" w-full">
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label as any}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem.type as any}
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
                    ) : null
                  ) : inputItem?.name === 'address4' ? (
                    formik?.values?.consultation === 'Home' ? (
                      <div className="w-full">
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label as any}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem.type as any}
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
                    ) : null
                  ) : inputItem?.name === 'consultationType5' ? (
                    formik?.values?.consultation === 'Home' ? (
                      <div className=" w-full">
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label as any}
                          // multiline={inputItem?.multiline}
                          // rows={inputItem?.rows}
                          type={inputItem.type as any}
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
                    ) : null
                  ) : inputItem?.name === 'description' ? (
                    formik?.values?.healthIssues?.length &&
                    formik?.values?.healthIssues?.includes('Other') ? (
                      <div className=" w-full">
                        <TextInput
                          fullWidth
                          key={index}
                          name={inputItem?.name}
                          title={inputItem?.label as any}
                          multiline={inputItem?.multiline}
                          rows={inputItem?.rows}
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
                    <div className={'w-full'}>
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

export default AddAppointment
