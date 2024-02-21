import { useState } from "react";
import { IBooking } from "../models/IBooking";
import { useBookings } from "../contexts/BookingsContext";
import { ActionType } from "../reducers/BookingReducer";
import { deleteBooking, updateBooking } from "../Services/BookingService";

export interface IBookingProps {
  booking: IBooking;
}

const Bookings = ({ booking }: IBookingProps) => {
  const [editing, setEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({ ...booking });

  const { dispatch } = useBookings();

  const handleDelete = () => {
    deleteBooking(booking._id);
    dispatch({ type: ActionType.REMOVE, payload: booking._id });
  };

  const handleEdit = () => {
    console.log("edit ", editedBooking, booking);

    console.log("edit ", editedBooking, booking);

    setEditing(true);
    if (editing) {
      console.log("inne i if satsen");
      updateBooking(editedBooking);
      dispatch({ type: ActionType.PUT, payload: editedBooking });
      setEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedBooking(prevState => ({
      ...prevState,
      [name]: name === "numberOfGuests" ? +value : value
    }));
  };

  return (
    <div className="bookingInputs">
      <label htmlFor="id">Booking ID</label>
      <input
        type="text"
        name="id"
        value={booking._id}
        onChange={handleChange}
        disabled={!editing}
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        value={editedBooking.date}
        onChange={handleChange}
        disabled={!editing}
      />
      <label htmlFor="numberOfGuests">Guests</label>
      <input
        type="number"
        name="numberOfGuests"
        value={editedBooking.numberOfGuests}
        onChange={handleChange}
        disabled={!editing}
      />
      <label htmlFor="time">Time</label>
      <input
        type="time"
        name="time"
        value={editedBooking.time}
        onChange={handleChange}
        disabled={!editing}
      />
      <div>
        <button onClick={handleEdit}>
          {editing ? "Save" : "Edit"}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Bookings;
