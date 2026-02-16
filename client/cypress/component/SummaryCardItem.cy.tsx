import SummaryCardItem from '../../src/pages/dashboard/components/summary-card-item'
import { AccountBalance as AccountBalanceIcon } from '@mui/icons-material'

describe('SummaryCardItem', () => {
  beforeEach(() => {
    cy.mount(
      <SummaryCardItem
        Icon={AccountBalanceIcon}
        title="Total Assets"
        value={'10'}
        tagline="Active positions"
      />
    )
  })

  it('should run the component', () => {
    cy.getByTestId('SummaryCardItem.Title').should('have.text', 'Total Assets')
    cy.getByTestId('SummaryCardItem.Value').should('have.text', '10')
    cy.getByTestId('SummaryCardItem.Tagline').should(
      'have.text',
      'Active positions'
    )
  })
})
