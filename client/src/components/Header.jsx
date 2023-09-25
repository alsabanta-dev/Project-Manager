import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <Link className="navbar-brand" to='/'>
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" className="me-2" />
            <div>Project Manager</div>
          </div>
        </Link>
      </div>
    </nav>
  )
}