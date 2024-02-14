import { useContext, useEffect, useReducer, useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { BookingsContext, IBookingsContext } from "../contexts/BookingContext";
import { ActionType, BookingReducer } from "../reducers/BookingReducer";
import { Booking } from "../models/Booking";
import { getBookings } from "../Services/BookingService";

export const Home = () => {
  const [state, setState] = useState<IBookingsContext>({ bookings: [], dispatch: () => { } });
  const [bookings, dispatch] = useReducer(BookingReducer, state.bookings);

  const addNewBooking = (newBooking: Booking) => {
    dispatch({ type: ActionType.ADD, payload: newBooking })
    console.log('click', newBooking);
    // createBooking(newBooking)
    // getBookings().then((bookings) => {

    // })
  }

  useEffect(() => {
    getBookings().then((bookings: Booking[]) => {
      console.log('bookings', bookings);
      state.bookings = bookings;
    }, [])
  })

  return <BookingsContext.Provider value={{ bookings, dispatch }} >
    <BookingForm handleClick={addNewBooking} />
    {/* <ul>
      {bookings.map((booking, index) => (
        <li key={index}>{booking.date} - {booking.time}- {booking.numberOfGuests}
        </li>
      ))}
    </ul> */}
  </BookingsContext.Provider>;
}