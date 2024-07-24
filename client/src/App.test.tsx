import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { pingApi } from './apis/api-utils'

jest.mock('./apis/api-utils')
const mockPingApi = pingApi as jest.MockedFunction<typeof pingApi>
describe('App component', ()=> {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Renders Welcome banner', async () => {
    mockPingApi.mockResolvedValue({})
    const { getAllByText} = render(<App />)
    await waitFor(() => {
      const welcomeElements = getAllByText(/Welcome to/i)
      expect(welcomeElements.length).toBe(2)
      expect(welcomeElements[0]).toBeInTheDocument()
      expect(welcomeElements[1]).toBeInTheDocument()
    })
  })
})
