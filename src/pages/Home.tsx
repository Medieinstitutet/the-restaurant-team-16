import { useEffect, useState } from "react";
import { createBooking, getBookings } from "../Services/BookingService";
import { BookingForm } from "../components/BookingForm";
import { Booking } from "../models/Booking";

export const Home = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings()
      setBookings(data)
      console.log(data);
    }
    fetchBookings()
  }, []);


  const addNewBooking = (newBooking: Booking) => {
    console.log('click');
    createBooking(newBooking)
  }

  return <>
    <BookingForm handleClick={addNewBooking} />
    <ul>
      {bookings.map((booking, index) => (
        <li key={index}>{booking.date} - {booking.time}- {booking.numberOfGuests}
        </li>
      ))}
    </ul>
  </>;
}