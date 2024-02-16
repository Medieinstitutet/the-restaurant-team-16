import { useEffect, useState } from 'react';
import { getBookings } from '../Services/BookingService';
import { Booking } from '../models/Booking';
import Bookings from '../components/Bookings';
import '../styles/Admin.scss'

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings();
      setBookings(data);
      console.log(data);
    };
    fetchBookings();
  }, []);
  return (
    <>
      <h1>Bookings</h1>

      <ul className="bookings">
        {bookings.map((booking, index) => (
          <Bookings key={index} booking={booking} />
        ))}
      </ul>
    </>
  );
};

export default Admin;
