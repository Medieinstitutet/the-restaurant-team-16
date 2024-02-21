import { useState } from 'react';
import { API_BASE_URL } from '../Services/BookingService';
import { put, remove } from '../Services/serviceBase';
import './Bookings.scss';
import { IBooking } from '../models/IBooking';

export interface IBookingProps {
  booking: IBooking;
  onUpdateBookings: () => void;
}

const Bookings = ({ booking, onUpdateBookings }: IBookingProps) => {
  const [editing, setEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({ ...booking });

  const handleDelete = () => {
    remove(`${API_BASE_URL}booking/delete/${booking._id}`)
      .then(() => {
        onUpdateBookings();
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  const handleEdit = () => {
    console.log('edit ', editedBooking, booking);

    setEditing(true);
    if (editing) {
      console.log('inne i if satsen');
      put(`${API_BASE_URL}booking/update/${booking._id}`, {
        ...editedBooking,
        id: editedBooking._id,
      })
        .then(() => {
          onUpdateBookings();
          console.log('haaaaaaalo', editedBooking);
          setEditing(false);
        })
        .catch(error => {
          console.error('Error updating booking:', error);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedBooking(prevState => ({
      ...prevState,
      [name]: name === 'numberOfGuests' ? +value : value,
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
        <button onClick={handleEdit}>{editing ? 'Save' : 'Edit'}</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Bookings;
