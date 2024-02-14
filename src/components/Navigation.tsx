import { NavLink } from 'react-router-dom'

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
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
