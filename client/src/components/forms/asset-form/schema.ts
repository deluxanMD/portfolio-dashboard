import * as yup from 'yup'

export const assetSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    symbol: yup.string().required('Symbol is required').uppercase(),
    type: yup
      .string()
      .oneOf(['Stock', 'Bond', 'Mutual Fund', 'ETF', 'Real Estate'])
      .required('Type is required'),
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .positive('Must be positive')
      .required('Quantity is required'),
    purchasePrice: yup
      .number()
      .typeError('Price must be a number')
      .positive('Must be positive')
      .required('Price is required'),
  })
  .required()
