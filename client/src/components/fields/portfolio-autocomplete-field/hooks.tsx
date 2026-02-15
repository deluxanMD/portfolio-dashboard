import { useCallback } from 'react'

export const useOnAutocompleteChange = (field: any, multiple: boolean) =>
  useCallback(
    (_e: any, option: any, reason: string) => {
      if (multiple) {
        field.onChange(option.map((option: any) => option?.id))
      } else {
        if (reason === 'clear') field.onChange('')
        else field.onChange(option.id)
      }
    },
    [field, multiple]
  )
