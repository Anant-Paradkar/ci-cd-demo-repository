import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navigation-tabs'>
      <nav id='gigs-nav-bar'>
        <NavLink to='/' end>Home</NavLink>
      </nav>
    </div>
  )
}

export default NavBar
