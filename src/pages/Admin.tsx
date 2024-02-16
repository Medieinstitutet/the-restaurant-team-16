import { getBookings } from '../Services/BookingService';
import Bookings from '../components/Bookings';
import { useBookings } from '../contexts/BookingsContext';
import { Booking } from '../models/Booking';
import { ActionType } from '../reducers/BookingReducer';
const Admin = () => {
  const { bookings, dispatch } = useBookings();

  const fetchBookings = async () => {
    const bookings: Booking[] = await getBookings();
    dispatch({ type: ActionType.SET_BOOKINGS, payload: bookings });
  };

  const onUpdateBookings = () => {
    fetchBookings();
  };

  return (
    <>
      <h1>Bookings</h1>

      <ul className="bookings">
        {bookings.map((booking, index) => (
          <Bookings key={index} booking={booking} onUpdateBookings={onUpdateBookings} />
        ))}
      </ul>
    </>
  );
};

export default Admin;
