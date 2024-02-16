import { useState } from 'react';
import { API_BASE_URL } from '../Services/BookingService';
import { put, remove } from '../Services/serviceBase';
import './Bookings.scss';
import { Booking } from '../models/Booking';
// import { Booking } from '../models/Booking';

interface IBooking {
  id: string;
  restaurantId: '623b85d54396b96c57bde7c3';
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
  // [key: string]: any;
}

const Bookings = ({ booking, onUpdateBookings }: any) => {
  const [editing, setEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({ ...booking });

  const handleDelete = () => {
    remove(`${API_BASE_URL}booking/delete/${booking._id}`)
      .then(() => {
        // Update the bookings in the parent component after successful deletion
        onUpdateBookings();
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  const handleEdit = () => {
    console.log('edit ', editedBooking);
    editedBooking.numberOfGuests = +editedBooking.numberOfGuests;

    console.log(
      'edit after ',
      editedBooking,
      'booking ',
      booking,
      'booking_id',
      booking._id
    );
    setEditing(true);
    if (editing) {
      console.log('inne i if satsen');
      put(`${API_BASE_URL}booking/update/${booking._id}`, editedBooking)
        .then(() => {
          onUpdateBookings(); // Update bookings after successful edit
          console.log('haaaaaaalo', editedBooking);
          setEditing(false); // Disable editing mode
        })
        .catch(error => {
          console.error('Error updating booking:', error);
        });
    }
    // else {
    //   setEditing(true); // Enable editing mode
    //   console.log(editedBooking);
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedBooking((prevState: any) => ({
      // ...prevState,
      // ...(name === '_id' ? { id: value } : { [name]: value }),
      //   let newState = { ...prevState };
      // if (name === '_id') {
      //   newState['id'] = value;
      // } else {
      //   newState[name as keyof IBooking] = name === 'numberOfGuests' ? +value : value;
      // }
      // return newState;
    }));
  };

  return (
    <div className="bookingInputs">
      {/* <input type="text" value={`Booking ID: ${booking._id}`} disabled />
      <input type="text" value={`Date: ${booking.date}`} disabled />
      <input type="text" value={`Guests: ${booking.numberOfGuests}`} disabled />
      <input type="text" value={`Time: ${booking.time}`} disabled /> */}
      <input
        type="text"
        name="date"
        value={booking._id}
        onChange={handleChange}
        disabled={!editing}
      />
      <input
        type="date"
        name="date"
        value={editedBooking.date}
        onChange={handleChange}
        disabled={!editing}
      />
      <input
        type="number"
        name="numberOfGuests"
        value={editedBooking.numberOfGuests}
        onChange={handleChange}
        disabled={!editing}
      />
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
