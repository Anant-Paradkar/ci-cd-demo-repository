import './App.css'
import Spinner from './components/Spinner'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import AppRoutes from './components/AppRoutes'

const serverAddress = process.env.VITE_SERVER_ADDRESS || 'NOT_SET'
const stackName = process.env.VITE_STACK_NAME || 'NO_GIGS_STACK_NAME'

const App = () => {
  return (
    <div className='app-wrapper'>
      <div className='header-spinner'>
        <Spinner serverAddress={serverAddress} path='healthcheck' />
      </div>
      <h1 className='main-title'>Welcome to {stackName}</h1>
      <BrowserRouter>
        <div className='app-and-routes'>
          <NavBar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
