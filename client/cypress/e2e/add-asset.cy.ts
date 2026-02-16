describe('assets', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/assets',
      },
      {
        success: true,
        data: [],
      }
    ).as('getAssets')

    cy.intercept(
      {
        method: 'POST',
        url: '**/api/assets',
      },
      {
        statusCode: 201,
        success: true,
        data: {
          _id: 'mock-asset-id',
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          type: 'Stock',
          quantity: 10,
          purchasePrice: 150,
          currentPrice: 155,
          user: 'test-user-id',
        },
      }
    ).as('createAsset')

    cy.visit('http://localhost:5173/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('token', 'mock-valid-jwt-token')
        win.localStorage.setItem('refreshToken', 'mock-valid-refresh-token')
      },
    })
  })

  it('should load empty asset message', () => {
    cy.getByTestId('AssetsEmpty.Title').should('have.text', 'No assets found')
    cy.getByTestId('AssetsEmpty.Description').should(
      'have.text',
      'Start building your portfolio by adding an investment.'
    )
  })

  it('should load assets', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/api/assets',
      },
      {
        success: true,
        data: [
          {
            _id: 'mock-asset-id',
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            type: 'Stock',
            quantity: 10,
            purchasePrice: 150,
            currentPrice: 155,
            user: 'test-user-id',
          },
        ],
      }
    ).as('getAssetsPopulated')

    cy.wait('@getAssetsPopulated')

    cy.getByTestId('AssetsEmpty.Title').should('not.exist')
    cy.getByTestId('AssetsEmpty.Description').should('not.exist')
    cy.getByTestId('SummaryCard').should('exist')
  })

  it('should create asset', () => {
    cy.getByTestId('AddInvestment.Button').click()
    cy.getByTestId('AssetDialog').should('exist')
    cy.getByTestId('PFTextField').eq(0).type('GOOGL')
    cy.getByTestId('PFAutocompleteField').click()
    cy.contains('Stock').click()
    cy.getByTestId('PFTextField').eq(1).type('Alphabet Inc.')
    cy.getByTestId('PFTextField').eq(2).type('10')
    cy.getByTestId('PFTextField').eq(3).type('150')
    cy.getByTestId('AssetDialog.SubmitButton').click()

    cy.wait('@createAsset').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201)
    })
  })
})
