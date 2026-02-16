import { Provider } from 'react-redux'
import AssetDialog from '../../src/components/dialogs/asset-dialog'
import { store } from '../../src/store'

describe('AssetDialog', () => {
  describe('Add Investment', () => {
    beforeEach(() => {
      cy.viewport(640, 480)
      cy.mount(
        <Provider store={store}>
          <AssetDialog
            open
            assetId="12341234"
            handleClose={() => null}
            isEdit={false}
          />
        </Provider>
      )
    })

    it('should run the component', () => {
      cy.getByTestId('AssetDialog').should('exist')
      cy.getByTestId('AssetDialog.Title').should('have.text', 'Add Investment')
      cy.getByTestId('AssetDialog.SubmitButton').should(
        'have.text',
        'Add Asset'
      )
    })

    it('should validate the form', () => {
      cy.getByTestId('AssetDialog.SubmitButton').click()
      cy.getByTestId('PFTextField.HelperText').should('have.length', 4)
      cy.getByTestId('PFTextField.HelperText')
        .eq(0)
        .should('have.text', 'Name is required')
      cy.getByTestId('PFTextField.HelperText')
        .eq(1)
        .should('have.text', 'Symbol is required')
      cy.getByTestId('PFTextField.HelperText')
        .eq(2)
        .should('have.text', 'Quantity is required')
      cy.getByTestId('PFTextField.HelperText')
        .eq(3)
        .should('have.text', 'Price is required')
      cy.getByTestId('PFAutocompleteField.HelperText').should('have.length', 1)
      cy.getByTestId('PFAutocompleteField.HelperText')
        .eq(0)
        .should('have.text', 'Type is required')
    })
  })

  describe('Edit Investment', () => {
    beforeEach(() => {
      cy.viewport(640, 480)
      cy.mount(
        <Provider store={store}>
          <AssetDialog
            open
            assetId="12341234"
            handleClose={() => null}
            isEdit
          />
        </Provider>
      )
    })

    it('should run the component', () => {
      cy.getByTestId('AssetDialog').should('exist')
      cy.getByTestId('AssetDialog.Title').should('have.text', 'Edit Investment')
      cy.getByTestId('AssetDialog.SubmitButton').should('have.text', 'Update')
    })
  })
})
