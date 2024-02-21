import { createBooking, getCustomersId } from '../Services/BookingService';
import Bookings from '../components/Bookings';
import { useBookings } from '../contexts/BookingsContext';
import { ActionType } from '../reducers/BookingReducer';
import Button, { ITheme } from '../components/Button';
import { BookingForm } from '../components/BookingForm';
import { useState } from 'react';
import { Booking } from '../models/Booking';
import { Message, MessageType } from '../components/Message';

const Admin = () => {
  const { bookings, dispatch } = useBookings();
  const [showForm, setShowForm] = useState(false);
   const [message, setMessage] = useState<{ text: string, type: MessageType } | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm)
  }

   const setTimeOutMessage = () => {
     setTimeout(() => {
          setMessage(null);
          setShowMessage(false);
        
        }, 3000);
    }

    const addNewBooking = async (newBooking: Booking) => {
        try {
            const createdBooking = await createBooking(newBooking);
          getCustomersId(createdBooking.insertedId).then((data) => {
            dispatch({ type: ActionType.ADD, payload: data });
          });
          setShowForm(false);
          setShowMessage(true);
          setMessage({ text: `Thank ${newBooking.customer.name} ${newBooking.customer.lastname} for your booking`, type: MessageType.SUCCES });
          setTimeOutMessage();

        } catch (error) {
            console.error('Failed to create booking:', error);
        }
  }

  return (
    <>
      <h1>Bookings</h1>
      <Button text={`${showForm ? 'Hide the form' :'Add new booking'}`} theme={ITheme.PRIMARY} handleClick={handleClick}>
      </Button>

      {showForm ? <div><BookingForm handleClick={addNewBooking} /></div> : <div>
        {showMessage && <Message text={message!.text} type={message!.type} />}
            </div>}

      <ul className="bookings">
        {bookings.map((booking, index) => (
          <Bookings key={index} booking={booking} />
        ))}
      </ul>
    </>
  );
};

export default Admin;
