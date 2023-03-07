// import { clinics } from "configs";

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

const TypeSelecter = ({
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
  console.log(value, defaultValue)
  return (
    <FormControl fullWidth>
      <div className="flex flex-col gap-2">
        <p className="pt-3 font-bold text-theme">Select Unit *</p>
        <select
          // defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id=""
          className={`flex w-full gap-3 rounded-lg border p-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${className}`}
        >
          <option value=""> Choose Unit </option>
          {options.map((item: any, index: any) => (
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

export default TypeSelecter

// interface CountryType {
//   code: string;
//   label: string;
//   phone: string;
//   suggested?: boolean;
// }
