import * as yup from 'yup'

export const transactionSchema = yup
  .object({
    type: yup.string().oneOf(['BUY', 'SELL']).required(),
    quantity: yup
      .number()
      .typeError('Must be a number')
      .positive('Must be positive')
      .required('Required'),
    pricePerUnit: yup
      .number()
      .typeError('Must be a number')
      .positive('Must be positive')
      .required('Required'),
  })
  .required()
