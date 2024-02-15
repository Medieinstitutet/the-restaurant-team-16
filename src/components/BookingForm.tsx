import { useState } from "react";
import { Booking } from "../models/Booking"
import { Customer } from "../models/Customer";
import "./BookingForm.scss";
import { useBookings } from "../contexts/BookingsContext";
import { Message, MessageType } from "./Message";
import Button, { ITheme } from "./Button";

interface IBookingProps {
    booking?: Booking;
    handleClick: (newBooking: Booking) => void;
}

interface ISittingAvailability {
    [key: string]: boolean;
}

export const BookingForm = ({ booking, handleClick }: IBookingProps) => {
    const [newBooking, setNewBooking] = useState<Booking>(booking || new Booking("", "", "", 0, new Customer("", "", "", "")));

    const [message, setMessage] = useState<{ text: string, type: MessageType } | null>(null);
    const [showMessage, setShowMessage] = useState(false);

    const [sittingAvailability, setSittingAvailability] = useState<ISittingAvailability>();

    const { bookings } = useBookings();

    const getTotalPersonsForDateAndTime = (date: string, time: string) => {
        return bookings.filter(booking => booking.date === date && booking.time === time).reduce((total, booking) => total + booking.numberOfGuests, 0)
    }
    const sittings = ["18:00", "21:00"];

    const updateBookingField = (key: keyof Booking, value: string | number) => {
        const totalAvailableSeats = 15 * 6;
        const availability: ISittingAvailability = {}
        if (key === "date") {
            console.log('date', value);
            sittings.forEach(sitting => {
                const totalPersons = getTotalPersonsForDateAndTime(value as string, sitting);
                availability[sitting] = totalPersons < totalAvailableSeats;
            });
            console.log('availableSeats', availability);
            setSittingAvailability(availability);
        }
        if (key === "numberOfGuests") {
            const totalPersons = getTotalPersonsForDateAndTime(newBooking.date, newBooking.time);
            if (totalPersons + (value as number) > totalAvailableSeats) {
                console.log('No seats available');
                setShowMessage(true);
                setMessage({ text: "So many people are not allowed to book a table at the same time, please try again with fewer people.", type: MessageType.ERROR });
                setTimeOutMessage();
                return;
            }
        }

        setNewBooking(prev => ({
            ...prev,
            restaurantId: "65cb4a68505ba22f8dc6636f",
            [key]: value
        }));
    };


    const updateCustomerField = (key: keyof Customer, value: string) => {
        setNewBooking(prev => ({
            ...prev,
            customer: { ...prev.customer, [key]: value }
        }));
    };

    const getValueAsString = (value: unknown): string => {
        if (value === null || value === undefined) {
            return '';
        }
        return value.toString();
    }

    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const renderInputField = (key: string, value: string | number | Customer, inputType: string) => {
        const min = key === "date" ? getTodayString() : undefined;
        return (
            <input
                type={inputType}
                id={key}
                min={min}
                value={getValueAsString(value)}
                onChange={(e) => { updateBookingField(key as keyof Booking, inputType === "number" ? parseInt(e.target.value) : e.target.value) }}
            />
        )
    }

    const renderTimeButtons = (key: string, value: string, options: string[]) => {
        return (
            <div>
                {options.map((time, index) => (
                    <button key={index}
                        type="button"
                        className={`${value === time ? 'selected' : ''} ${sittingAvailability ? sittingAvailability[time] ? '' : 'disabled' : ''}`}
                        disabled={sittingAvailability ? !sittingAvailability[time] : false}
                        onClick={() => { updateBookingField(key as keyof Booking, time) }}>
                        {time}
                    </button>
                ))}
            </div>
        )
    }

    const setTimeOutMessage = () => {
        setTimeout(() => {
            setMessage(null);
            setShowMessage(false);
        }, 3000);
    }


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBooking.date || !newBooking.time || !newBooking.numberOfGuests || !newBooking.customer.name || !newBooking.customer.lastname || !newBooking.customer.email || !newBooking.customer.phone) {
            setShowMessage(true);
            setMessage({ text: "All fields are required", type: MessageType.ERROR });
            setTimeOutMessage();
        } else {
            handleClick(newBooking);
            setNewBooking(booking || new Booking('', '', '', 0, new Customer('', '', '', '')));
            setSittingAvailability(undefined);
            console.log('submit', bookings, newBooking);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                {Object.keys(newBooking).map((key, index) => {
                    if (key === "restaurantId") return null;

                    if (key === "customer") {
                        return Object.keys(newBooking.customer).map((customerKey, customerIndex) => (
                            <div key={`customer-${customerIndex}`}>
                                <label htmlFor={`customer-${customerKey}`}>{customerKey.charAt(0).toUpperCase() + customerKey.slice(1)}</label>
                                <input
                                    type="text"
                                    id={`customer-${customerKey}`}
                                    value={newBooking.customer[customerKey as keyof Customer] || ''}
                                    onChange={(e) => updateCustomerField(customerKey as keyof Customer, e.target.value)}
                                />
                            </div>
                        ));
                    }
                    let inputField;
                    const value = newBooking[key as keyof Booking];
                    switch (key) {
                        case "time":
                            inputField = renderTimeButtons(key, value as string, ["18:00", "21:00"]);
                            break;
                        case "numberOfGuests":
                            inputField = renderInputField(key, value || '', "number");
                            break;
                        case "date":
                            inputField = renderInputField(key, value || '', "date");
                            break;
                        default:
                            inputField = renderInputField(key, value || '', "text");
                            break;
                    }

                    return (
                        <div key={index}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            {inputField}
                        </div>
                    )
                })}
                <Button type="submit" text="Boka" theme={ITheme.PRIMARY} />

                {showMessage && <Message text={message!.text} type={message!.type} />}
            </form>
        </div>
    )
} 