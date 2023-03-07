import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { FocusEvent, Fragment, useState } from 'react'

type Props = {
  onChange?: (event: any, value: any) => void
  value?: any
  noOptionText?: any
  options?: any[]
  loading?: boolean
  label?: string
  labelClass?: string
  isOptionEqualToValue?: (option: any, value: any) => boolean
  name?: string
  size: 'small' | 'medium'
  className?: string
  textClassName?: string
  onBlur?: (e: FocusEvent<any, Element>) => void
  error?: boolean
  helperText?: string
}

const AdminAutocomplete = ({
  onChange,
  value,
  noOptionText,
  options = [],
  loading,
  labelClass = 'font-medium tracking-wide text-base',
  label,
  isOptionEqualToValue,
  error,
  helperText,
  size,
  name,
  className,
  textClassName,
  onBlur,
}: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <p className={`text-wider font-medium  ${className}`}>{label}</p>
      )}
      <Autocomplete
        size={size}
        id="asynchronous-autocomplete"
        open={open}
        fullWidth
        onBlur={onBlur}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option: any) =>
          `${option.label} ${
            option?.optionName ? `(${option?.optionName})` : ''
          }`
        }
        onChange={onChange}
        value={value}
        noOptionsText={noOptionText}
        options={options || []}
        loading={loading}
        renderInput={(params) => (
          <>
            <TextField
              name={name}
              className={textClassName}
              error={error}
              helperText={helperText}
              {...params}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          </>
        )}
      />
    </div>
  )
}

export default AdminAutocomplete
