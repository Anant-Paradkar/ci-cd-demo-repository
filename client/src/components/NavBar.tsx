import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navigation-tabs'>
      <nav id='gigs-nav-bar'>
        <NavLink to='/' end>Home</NavLink>
        <NavLink to='/gigs'>Gig Listings</NavLink>
        <NavLink to='/newgig'>New Gig</NavLink>
        <NavLink to='/gigdata'>Gig Venue Details</NavLink>
        <NavLink to='/gigdatabyid'>Gig Details By Id</NavLink>
        <NavLink to='/newgigdata'>New Gig Details</NavLink>
        <NavLink to='/users'>User List</NavLink>
        <NavLink to='/newuser'>New User</NavLink>
        <NavLink to='/tickets'>Ticket List</NavLink>
        <NavLink to='/newticket'>New Ticket</NavLink>
      </nav>
    </div>
  )
}

export default NavBar
