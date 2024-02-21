import { getBookings } from '../Services/BookingService';
import Bookings from '../components/Bookings';
import { useBookings } from '../contexts/BookingsContext';
import { ActionType } from '../reducers/BookingReducer';
import '../styles/Admin.scss';
import { IBooking } from '../models/IBooking';
import { ITheme } from '../components/Button';
import { Link } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';

const Admin = () => {
  const { bookings, dispatch } = useBookings();

  const fetchBookings = async () => {
    const bookings: IBooking[] = await getBookings();
    dispatch({ type: ActionType.SET_BOOKINGS, payload: bookings });
  };

  const onUpdateBookings = () => {
    fetchBookings();
  };

  return (
    <>
      <h1>Bookings</h1>
      <Link className={`button ${ITheme.PRIMARY}`} to={'/booking-page'}>
        Add new booking
      </Link>

      <ul className="bookings">
        {bookings.map((booking, index) => (
          <Bookings key={index} booking={booking} onUpdateBookings={onUpdateBookings} />
        ))}
      </ul>
    </>
  );
};

//Admin verkar ha 2 footers, vet inte varför.
export default Admin;
