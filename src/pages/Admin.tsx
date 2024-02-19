import { getBookings } from '../Services/BookingService';
import Bookings from '../components/Bookings';
import { useBookings } from '../contexts/BookingsContext';
import { ActionType } from '../reducers/BookingReducer';
import '../styles/Admin.scss'
import { IBooking } from '../models/IBooking';

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
