import { CloudUpload } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useRef } from 'react'
// import Swal from "sweetalert2";
type Props = {
  value?: any
  variant?: 'square' | 'rounded' | 'circular'
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any
  height?: number
  width?: number
  dimensions?: number
  className?: string
  txtName?: string
}
const PhotoUpload = ({
  value,
  onChange,
  variant,
  height,
  width,
  dimensions,
  className,
  txtName,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = async (e: any) => {
    try {
      const file = e?.target?.files?.[0]
      if (!file) return
      if (!dimensions) return onChange(e)
      // Swal.fire(
      //   "Invalid Dimensions",
      //   `Please use ${dimensions.width}x${dimensions.height} images`,
      //   "warning"
      // );
    } catch (error) {}
  }
  return (
    <>
      <Avatar
        variant={variant || 'square'}
        src={
          value?.target?.files[0]
            ? URL.createObjectURL(value?.target?.files[0])
            : value
        }
        className={className}
        sx={{
          height: height || 120,
          width: width || 120,
          cursor: 'pointer',
        }}
        onClick={() => inputRef.current?.click()}
      >
        {!value && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <CloudUpload className="text-5xl" />
            <small>{txtName}</small>
          </div>
        )}
      </Avatar>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageChange}
        accept="image/*|.pdf|.doc"
      />
    </>
  )
}

export default PhotoUpload
