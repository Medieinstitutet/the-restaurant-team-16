import React from 'react';

const Bookings = ({ booking }: any) => {
  return (
    <div>
      <p>Customer Name: </p>
      <p>Date: {booking.date}</p>
      <p>Guests: {booking.numberOfGuests}</p>
      <p>Time: {booking.time}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Bookings;
