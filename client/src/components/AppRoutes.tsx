import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import GigsPage from './GigsPage'
import GigDataPage from './GigsDataPage'
import GigsDataPageById from './GigsDataPageById'
import NewGigDataPage from './NewGigDataPage'
import NewGigPage from './NewGigPage'
import UsersPage from './UsersPage'
import NewUserPage from './NewUserPage'
import TicketsPage from './TicketsPage'
import NewTicketPage from './NewTicketPage'

const serverAddress = process.env.VITE_SERVER_ADDRESS || 'NOT_SET'
const flyersAddress = process.env.VITE_FLYERS_ADDRESS || 'NOT_SET'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage serverAddress={serverAddress} />} />
    <Route path='/gigs' element={<GigsPage serverAddress={serverAddress} flyersAddress={flyersAddress}/>} />
    <Route path='/newgig' element={<NewGigPage serverAddress={serverAddress} />} />
    <Route path='/gigdata' element={<GigDataPage serverAddress={serverAddress} />} />
    <Route path='/gigdatabyid' element={<GigsDataPageById serverAddress={serverAddress} />} />
    <Route path='/newgigdata' element={<NewGigDataPage serverAddress={serverAddress} />} />
    <Route path='/users' element={<UsersPage serverAddress={serverAddress} />} />
    <Route path='/newuser' element={<NewUserPage serverAddress={serverAddress} />} />
    <Route path='/tickets' element={<TicketsPage serverAddress={serverAddress} />} />
    <Route path='/newticket' element={<NewTicketPage serverAddress={serverAddress} />} />
  </Routes>
)

export default AppRoutes
