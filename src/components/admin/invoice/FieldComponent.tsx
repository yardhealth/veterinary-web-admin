import React, { Dispatch } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

type actType = {
  id: any
  deleteField: (Id: any) => void
  formik: any
  value: any
}
const FieldComponent = ({ id, deleteField, formik, value }: actType) => {
  const deleteFieldById = () => {
    deleteField(id)
  }

  const handleChange = (innerKey: string, value: any) => {
    console.log(innerKey, value)
    formik?.setFieldValue(
      'pricingDetails',
      formik?.values?.pricingDetails?.map((item: any) => {
        if (item?.id === id) {
          return {
            ...item,
            [innerKey]: value,
          }
        }
        return item
      })
    )
  }

  return (
    <>
      <tr>
        <td className="border border-slate-600 p-3">
          <input
            name="itemDetails"
            type="text"
            className="rounded-md border border-slate-600 p-2"
            value={value?.item}
            onChange={(e) => handleChange('item', e?.target?.value)}
          />
        </td>
        <td className="border border-slate-600 p-3">
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={1.0}
            value={value?.quantity}
            onChange={(e) => {
              handleChange('quantity', e?.target?.value)
            }}
          />
        </td>

        <td className="border border-slate-600 p-3">
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={0.0}
            value={value?.rate}
            onChange={(e) => {
              handleChange('rate', e?.target?.value)
            }}
          />
        </td>
        <td className="border border-slate-600 p-3">
          <input
            type="number"
            className="rounded-md border border-slate-600 p-2"
            defaultValue={0.0}
            disabled
            value={Number(value?.quantity) * Number(value?.rate)}
          />
        </td>
        <td className="border border-slate-600 p-3">
          <div className="flex cursor-pointer items-center justify-center text-red-600">
            <DeleteIcon onClick={deleteFieldById} />
          </div>
        </td>
      </tr>
    </>
  )
}

export default FieldComponent
