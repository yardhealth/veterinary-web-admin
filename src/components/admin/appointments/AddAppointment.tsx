// import BedCategorySelecter from "components/BedCategorySelecter";
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
import RoleSelecter from 'components/core/RoleSelecter'
import AnimalSelecter from 'components/core/AnimalSelecter'
import PhotoUpload from 'components/core/PhotoUpload'
import { useFetch } from 'hooks'
import CategoryType from 'types/category'
import CustomerType from 'types/customer'
import { database, storage } from 'configs'
import Swal from 'sweetalert2'
import ConsultationTypeSelecter from './ConsultationTypeSelecter'
import AvailableSlot from 'components/core/AvailableSlot'

const AddAppointment = () => {
  const [categories] = useFetch<CategoryType[]>(`/Categories`, {
    needNested: false,
    needArray: true,
  })
  const [customers] = useFetch<CustomerType[]>(`/Customers`, {
    needNested: false,
    needArray: true,
  })
  const AddRecordExpenseSchema = useMemo(() => {
    return [
      {
        key: '1',
        // placeholder: 'Enter your email',
        name: 'ownerName',
        label: 'Owner Name *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'text',
        validationSchema: Yup.string().required('Owner name is required'),
        initialValue: '',
        icon: <BorderColor />,
        required: true,
      },
      {
        key: '2',
        // placeholder: 'Enter your email',
        name: 'contact',
        label: 'Contact Number *',
        placeholder: '',
        styleContact: 'rounded-lg',
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
        label: 'Category Name *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.string().required('Category name is required'),
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
          ,
        ],
      },

      {
        key: '4',
        label: 'Pet Name',
        name: 'name',
        type: 'text',
        validationSchema: Yup.string().required('Name is required'),
        initialValue: '',
        icon: <BorderColor />,
        styleContact: 'rounded-lg',
        required: true,
      },

      {
        key: '5',
        // placeholder: 'Enter your email',
        name: 'gender',
        label: 'Gender *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().required('Amount is required'),
        initialValue: '',
        icon: <Transgender />,
        required: true,
        options: [
          {
            label: 'Male',
            value: 'Male',
          },
          {
            label: 'Female',
            value: 'Female',
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
        // styleContact: "rounded-lg",
        validationSchema: Yup.string().required('Breed is required'),
        initialValue: '',
        icon: <MergeType />,
        required: true,
        // multiline: true,
        // rows: 2,
      },
      {
        key: '7',
        name: 'age',
        label: 'Age *',
        placeholder: '',
        type: 'number',
        // styleContact: "rounded-lg",
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
        label: 'Weight *',
        placeholder: '',
        type: 'number',
        // styleContact: "rounded-lg",
        validationSchema: Yup.string().required('Weight is required'),
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
        label: 'Aggression *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().required('Aggression is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Low',
            value: 'Low',
          },
          {
            label: 'Med',
            value: 'Med',
          },
          {
            label: 'High',
            value: 'High',
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
        styleContact: 'rounded-lg',
        type: 'select',
        validationSchema: Yup.string().required('Field is required'),
        initialValue: '',
        icon: <CurrencyRupee />,
        required: true,
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
          ,
        ],
      },
      {
        key: '11',
        // placeholder: 'Enter your name',
        name: 'generalHealthIssues',
        label: 'General Health Issues *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.array(Yup.string()).required(
          'Category name is required'
        ),
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
            label: 'General checkup',
            value: 'General checkup',
          },
          {
            label: 'Fever',
            value: 'Fever',
          },
          {
            label: 'Inactive',
            value: 'Inactive',
          },
          {
            label: 'Skin rash or allergy',
            value: 'Skin rash or allergy',
          },
          {
            label: 'Injury',
            value: 'Injury',
          },
          {
            label: 'Vaccination',
            value: 'Vaccination',
          },
          {
            label: 'Swelling',
            value: 'Swelling',
          },
          {
            label: 'Not eating food',
            value: 'Not eating food',
          },
          {
            label: 'Travel certificate',
            value: 'Travel certificate',
          },
          ,
        ],
      },
      {
        key: '12',
        // placeholder: 'Enter your name',
        name: 'digestiveProblems',
        label: 'Digestive Problems *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.array(Yup.string()).required(
          'Category name is required'
        ),
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
            label: 'Weight loss',
            value: 'Weight loss',
          },
          {
            label: 'Diarrhea',
            value: 'Diarrhea',
          },
          {
            label: 'Vomiting',
            value: 'Vomiting',
          },
          {
            label: 'Constipation',
            value: 'Constipation',
          },
          {
            label: 'Bloated Stomach',
            value: 'Bloated Stomach',
          },
          {
            label: 'Blood in Vomit',
            value: 'Blood in Vomit',
          },
          {
            label: 'Blood in Stool',
            value: 'Blood in Stool',
          },
        ],
      },
      {
        key: '13',
        // placeholder: 'Enter your name',
        name: 'skinProblems',
        label: 'Skin Problems *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.array(Yup.string()).required(
          'Category name is required'
        ),
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
            label: 'Hair loss',
            value: 'Hair loss',
          },
          {
            label: 'Allergies',
            value: 'Allergies',
          },
          {
            label: 'Skin Rashes',
            value: 'Skin Rashes',
          },
          {
            label: 'Skin Infection',
            value: 'Skin Infection',
          },
          {
            label: 'Ticks/Fleas',
            value: 'Ticks/Fleas',
          },
          {
            label: 'Itching and Self Biting',
            value: 'Itching and Self Biting',
          },
        ],
      },
      {
        key: '14',
        // placeholder: 'Enter your name',
        name: 'eyeAndEarProblems',
        label: 'Eye and Ear Problems *',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.array(Yup.string()).required(
          'Category name is required'
        ),
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
        styleContact: 'rounded-xl overflow-hidden bg-white ',
        validationSchema: Yup.array(Yup.string()).required(
          'Category name is required'
        ),
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
        styleContact: 'rounded-lg',
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
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
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
            label: 'Clinic Vist',
            value: 'Clinic Vist',
          },
        ],
      },
      {
        key: '18',
        // placeholder: 'Enter your email',
        name: 'consultationType',
        label: 'House/Flat/Floor No. *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <House />,
        required: true,
      },
      {
        key: '19',
        // placeholder: 'Enter your email',
        name: 'consultationType',
        label: 'Apartment/Road/Area *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <AddRoad />,
        required: true,
      },
      {
        key: '20',
        // placeholder: 'Enter your email',
        name: 'consultationType',
        label: 'State *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <LocationOn />,
        required: true,
      },
      {
        key: '21',
        // placeholder: 'Enter your email',
        name: 'consultationType',
        label: 'Zip Code *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'number',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().required('Field required'),
          otherwise: Yup.string(),
        }),
        initialValue: '',
        icon: <PushPin />,
        required: true,
      },
      {
        key: '22',
        // placeholder: 'Enter your email',
        name: 'consultationType',
        label: 'City *',
        placeholder: '',
        styleContact: 'rounded-lg',
        type: 'text',
        validationSchema: Yup.string().when('consultation', {
          is: 'Home',
          then: Yup.string().required('Field required'),
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
        styleContact: 'rounded-lg',
        type: 'date',
        validationSchema: Yup.string().required('Appointment date is required'),
        initialValue: '',
        icon: <CalendarMonth />,
        required: true,
      },
      // {
      //   key: '1',
      //   // placeholder: 'Enter your email',
      //   name: 'time',
      //   label: 'Select Appointment Time *',
      //   placeholder: '',
      //   styleContact: 'rounded-lg',
      //   type: 'time',
      //   validationSchema: Yup.string().required('Appointment time is required'),
      //   initialValue: '',
      //   icon: <CalendarMonth />,
      //   required: true,
      // },
      {
        key: '24',
        name: 'time2',
        label: 'City *',
        validationSchema: Yup.string().required('City is required'),
        styleContact: 'rounded-lg',
        initialValue: '',
        placeholder: 'City',
        icon: <LocationCity />,
        required: true,
      },
      // {
      //   key: '1',
      //   // placeholder: 'Enter your name',
      //   name: 'customerName',
      //   label: 'Customer Name *',
      //   placeholder: '',
      //   styleContact: 'rounded-xl overflow-hidden bg-white ',
      //   validationSchema: Yup.string().required('Type is required'),
      //   type: 'select',
      //   initialValue: '',
      //   icon: <Person />,
      //   required: true,
      //   contactField: {
      //     xs: 12,
      //     sm: 12,
      //     md: 6,
      //     lg: 6,
      //   },
      //   options: customers?.map((item: CustomerType) => ({
      //     label: `${item?.primaryContact} (${item?.email}) `,
      //     value: `${item?.id}`,
      //     key: `${item?.id}`,
      //   })),
      // },
      {
        key: '25',
        // placeholder: 'Enter your name',
        name: 'payment',
        label: 'Payment Method *',
        type: 'select',
        placeholder: '',
        styleContact: 'rounded-xl overflow-hidden bg-white ',
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
        styleContact: 'rounded-lg',
        // validationSchema: Yup.string().required('file is required'),
        initialValue: '',
        icon: <Photo />,
        // required: true,
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
    try {
      if (values?.photo) {
        const fileRef = `Customers/${values?.customerName}/photoUrl`
        const res = await storage.ref(fileRef).put(values?.photo)
        const url = await res.ref.getDownloadURL()
        const ID = Date.now()
        await database
          .ref(`Customers/${values?.customerName}/Expenses/${ID}`)
          .update({
            date: values?.date,
            amount: values?.amount,
            category: values?.category,
            customerName: values?.customerName,
            notes: values?.notes,
            invoiceNumber: values?.invoiceNumber,
            documentUrl: url,
            createdAt: new Date().toString(),
          })
        await database.ref(`Expenses/${ID}`).update({
          date: values?.date,
          amount: values?.amount,
          category: values?.category,
          customerName: values?.customerName,
          notes: values?.notes,
          invoiceNumber: values?.invoiceNumber,
          documentUrl: url,
          createdAt: new Date().toString(),
        })
        setImage('')
        Swal.fire('Success', 'Successfully Addded', 'success')
        submitProps.resetForm()
      } else {
        await database.ref(`Customers/${values?.customerName}/Expenses`).push({
          ...values,
          createdAt: new Date().toString(),
        })
        await database.ref(`Expenses`).push({
          ...values,
          createdAt: new Date().toString(),
        })
        Swal.fire('Success', 'Successfully Addded', 'success')
        submitProps.resetForm()
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Something Went Wrong', 'error')
      submitProps.setSubmitting(false)
    }
  }
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
              {console.log(formik.values)}
              {AddRecordExpenseSchema?.map((inputItem: any, index: any) => (
                <div key={index}>
                  {inputItem?.name === 'time2' ? (
                    <div className="w-full">
                      <AvailableSlot />
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
                  ) : inputItem?.name === 'pet' ? (
                    <div className=" w-full py-4">
                      <AnimalSelecter
                        name="pet"
                        options={inputItem.options}
                        error={Boolean(
                          formik?.touched?.animal && formik?.errors?.animal
                        )}
                        helperText={formik?.errors?.animal}
                        value={formik?.values?.animal}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
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
                      />
                    </div>
                  ) : inputItem?.name === 'consultationType' ? (
                    formik?.values?.consultation === 'Home' ? (
                      <div className=" w-full py-4">
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
                      <div className=" w-full py-4">
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
      </div>
    </Container>
  )
}

export default AddAppointment
