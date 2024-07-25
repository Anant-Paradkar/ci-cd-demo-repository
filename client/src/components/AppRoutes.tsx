import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'

const serverAddress = process.env.VITE_SERVER_ADDRESS || 'NOT_SET'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage serverAddress={serverAddress} />} />
  </Routes>
)

export default AppRoutes
