import { useState } from 'react';
import { Booking } from '../models/Booking';
import { Customer } from '../models/Customer';
import { useBookings } from '../contexts/BookingsContext';
import { Message, MessageType } from './Message';
import Button, { ITheme } from './Button';

interface IBookingProps {
  booking?: Booking;
  handleClick: (newBooking: Booking) => void;
}

interface ISittingAvailability {
  [key: string]: boolean;
}

interface ISetValidInputStyle {
  [key: string]: string;
}

export const BookingForm = ({ booking, handleClick }: IBookingProps) => {
  const [newBooking, setNewBooking] = useState<Booking>(
    booking || new Booking('', '', '', 0, new Customer('', '', '', ''))
  );

  const [message, setMessage] = useState<{ text: string; type: MessageType } | null>(
    null
  );
  const [showMessage, setShowMessage] = useState(false);

  const [sittingAvailability, setSittingAvailability] =
    useState<ISittingAvailability>();

  const [validInputStyle, setValidInputStyle] = useState<ISetValidInputStyle>({});

  const { bookings } = useBookings();

  const getTotalPersonsForDateAndTime = (date: string, time: string) => {
    return bookings
      .filter(booking => booking.date === date && booking.time === time)
      .reduce((total, booking) => total + booking.numberOfGuests, 0);
  };

  const checkAvailability = (date?: string, numberOfGuests?: number) => {
    const sittings = ['18:00', '21:00'];
    const totalAvailableSeats = 15 * 6;
    const availability: ISittingAvailability = {};
    let isAvailable: boolean = false;
    if (date) {
      sittings.forEach(sitting => {
        const totalPersons = getTotalPersonsForDateAndTime(date, sitting);
        availability[sitting] = totalPersons < totalAvailableSeats;
      });
      console.log('availableSeats', availability);
      setSittingAvailability(availability);

      if (numberOfGuests) {
        isAvailable =
          getTotalPersonsForDateAndTime(newBooking.date, newBooking.time) +
            (numberOfGuests ?? 0) >
          totalAvailableSeats;
        console.log('No seats available');
        if (isAvailable) {
          setShowMessage(true);
          setMessage({
            text: 'So many people are not allowed to book a table at the same time, please try again with fewer people.',
            type: MessageType.ERROR,
          });
          setTimeOutMessage();
        }

        console.log('isAvailable', isAvailable);
      }
    }
    console.log('inne i func', [
      { isAvailableNumberOfGuests: isAvailable },
      availability,
    ]);
    return [{ isAvailableNumberOfGuests: isAvailable }, availability];
  };

  const updateBookingField = (key: keyof Booking, value: string | number) => {
    if (key === 'date') {
      console.log('date', value);
      const result = checkAvailability(value as string);
      console.log('result från if date i change', result);
      if (value === '' || result[0].isAvailableNumberOfGuests) {
        setValidInputStyle(prevState => ({ ...prevState, [key]: 'invalid' }));
        return;
      }
    }
    if (key === 'numberOfGuests') {
      const result = checkAvailability(newBooking.date, value as number);
      if (result[0].isAvailableNumberOfGuests || +value <= 0) {
        value = 0;
        setValidInputStyle(prevState => ({ ...prevState, [key]: 'invalid' }));
        return;
      } else {
        setValidInputStyle(prevState => ({ ...prevState, [key]: 'valid' }));
      }
      console.log('result från if numberOfGuests i change', result);
    }

    if (
      key === 'time' &&
      sittingAvailability &&
      !sittingAvailability[value as string]
    ) {
      setValidInputStyle(prevState => ({ ...prevState, [key]: 'invalid' }));
      return;
    }

    if (value === '') {
      setValidInputStyle(prevState => ({ ...prevState, [key]: 'invalid' }));
      return;
    } else {
      setValidInputStyle(prevState => ({ ...prevState, [key]: 'valid' }));
    }

    setNewBooking(prev => ({
      ...prev,
      restaurantId: '65cb4a68505ba22f8dc6636f',
      [key]: value,
    }));
  };
  console.log('validddddd', validInputStyle);

  const updateCustomerField = (key: keyof Customer, value: string) => {
    if (value === '') {
      setValidInputStyle(prevState => ({ ...prevState, [key]: 'invalid' }));
    } else {
      setValidInputStyle(prevState => ({ ...prevState, [key]: 'valid' }));
    }
    setNewBooking(prev => ({
      ...prev,
      customer: { ...prev.customer, [key]: value },
    }));
  };

  const getValueAsString = (value: unknown): string => {
    if (value === null || value === undefined) {
      return '';
    }
    return value.toString();
  };

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderInputField = (
    key: string,
    value: string | number | Customer,
    inputType: string
  ) => {
    const min =
      key === 'date' ? getTodayString() : key === 'numberOfGuests' ? 1 : undefined;
    return (
      <input
        type={inputType}
        id={key}
        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
        min={min}
        value={getValueAsString(value)}
        className={`${validInputStyle[key] ? validInputStyle[key] : ''} form__input`}
        onChange={e => {
          updateBookingField(
            key as keyof Booking,
            inputType === 'number' ? parseInt(e.target.value) : e.target.value
          );
        }}
        required={true}
      />
    );
  };

  const renderTimeButtons = (key: string, value: string, options: string[]) => {
    return (
      <div className="button__container">
        {options.map((time, index) => (
          <button
            key={index}
            type="button"
            className={`${value === time ? 'selected' : ''} ${
              sittingAvailability ? (sittingAvailability[time] ? '' : 'disabled') : ''
            } ${
              validInputStyle[key] ? validInputStyle[key] : ''
            } ${`button ${ITheme.PRIMARY}`}`}
            disabled={sittingAvailability ? !sittingAvailability[time] : false}
            onClick={() => {
              updateBookingField(key as keyof Booking, time);
            }}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };

  const setTimeOutMessage = () => {
    setTimeout(() => {
      setMessage(null);
      setShowMessage(false);
    }, 3000);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('newBooking', newBooking);
    if (
      !newBooking.date ||
      !newBooking.time ||
      !newBooking.numberOfGuests ||
      !newBooking.customer.name ||
      !newBooking.customer.lastname ||
      !newBooking.customer.email ||
      !newBooking.customer.phone
    ) {
      setShowMessage(true);
      setMessage({ text: 'All fields are required', type: MessageType.ERROR });
      setTimeOutMessage();
    } else {
      handleClick(newBooking);
      setNewBooking(
        booking || new Booking('', '', '', 0, new Customer('', '', '', ''))
      );
      setSittingAvailability(undefined);
      console.log('submit', bookings, newBooking);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        {Object.keys(newBooking).map((key, index) => {
          if (key === 'restaurantId') return null;

          if (key === 'customer') {
            return Object.keys(newBooking.customer).map(
              (customerKey, customerIndex) => (
                <div key={`customer-${customerIndex}`} className="container">
                  <input
                    type="text"
                    placeholder={
                      customerKey.charAt(0).toUpperCase() + customerKey.slice(1)
                    }
                    id={`customer-${customerKey}`}
                    value={newBooking.customer[customerKey as keyof Customer] || ''}
                    className={`${
                      validInputStyle[customerKey] ? validInputStyle[customerKey] : ''
                    } form__input`}
                    onChange={e =>
                      updateCustomerField(customerKey as keyof Customer, e.target.value)
                    }
                    required={true}
                  />
                  <label htmlFor={`customer-${customerKey}`} className="form__label">
                    {customerKey.charAt(0).toUpperCase() + customerKey.slice(1)}
                  </label>
                </div>
              )
            );
          }
          let inputField;
          const value = newBooking[key as keyof Booking];
          switch (key) {
            case 'time':
              inputField = renderTimeButtons(key, value as string, ['18:00', '21:00']);
              break;
            case 'numberOfGuests':
              inputField = renderInputField(key, value || '', 'number');
              break;
            case 'date':
              inputField = renderInputField(key, value || '', 'date');
              break;
            default:
              inputField = renderInputField(key, value || '', 'text');
              break;
          }

          return (
            <div className="container" key={index}>
              {inputField}
              <label htmlFor={key} className="form__label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            </div>
          );
        })}

        <div>
          <input type="checkbox" name="gdpr" id="gdpr" required />
          <label htmlFor="gdpr">
            I have read and agree to The Golden Fork's Terms of Service and Privacy
            Policy
          </label>
        </div>
        <Button type="submit" text="Book" theme={ITheme.PRIMARY} />

        {showMessage && <Message text={message!.text} type={message!.type} />}
      </form>
    </>
  );
};
