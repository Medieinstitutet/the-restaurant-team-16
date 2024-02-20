import { NavLink } from 'react-router-dom';
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav>
      <h3>The Golden Fork</h3>
      <ul className='container'>
        <li className='active'>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/booking-page'}>Booking</NavLink>
        </li>
        <li>
          <NavLink to={'/contact'}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  )
}
