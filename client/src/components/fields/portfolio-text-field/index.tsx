import { Box, TextField, type TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export type PFTextFieldProps = {
  name: string
  Icon?: any
  'data-testid'?: string
} & TextFieldProps

const PFTextField = ({
  name,
  label,
  Icon,
  helperText,
  'data-testid': dataTestId = 'PFTextField',
  ...rest
}: PFTextFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log(error)
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: helperText || !!error ? 'center' : 'flex-end',
            }}
          >
            {!!Icon && (
              <Icon
                sx={{ color: 'primary.main', mr: 1, my: 0.5 }}
                data-testid={`${dataTestId}.Icon`}
              />
            )}
            <TextField
              fullWidth
              size="small"
              label={label}
              data-testid={dataTestId}
              error={!!error}
              helperText={
                <span data-testid={`${dataTestId}.HelperText`}>
                  {!!error ? error.message : helperText}
                </span>
              }
              {...field}
              {...rest}
            />
          </Box>
        )
      }}
    />
  )
}

export default PFTextField
