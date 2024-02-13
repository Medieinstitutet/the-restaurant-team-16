import { useState } from "react";
import { Booking } from "../models/Booking"
import { Customer } from "../models/Customer";

interface IBookingProps {
    booking?: Booking;
    handleClick: (newBooking: Booking) => void;
}
export const BookingForm = ({ booking, handleClick }: IBookingProps) => {

    const [newBooking, setNewBooking] = useState<Booking>(booking || new Booking("", "", "", 0, new Customer("", "", "", "")));

    const updateBookingField = (key: keyof Booking, value: string | number) => {
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

    const renderInputField = (key: string, value: string | number | Customer, inputType: string) => {
        return (
            <input
                type={inputType}
                id={key}
                value={getValueAsString(value)}
                onChange={(e) => { updateBookingField(key as keyof Booking, inputType === "number" ? parseInt(e.target.value) : e.target.value) }}
            />
        )
    }

    const renderSelectField = (key: string, value: string | number | Customer, options: string[]) => {
        return (
            <select
                id={key}
                value={getValueAsString(value)}
                onChange={(e) => { updateBookingField(key as keyof Booking, e.target.value) }}>
                {options.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>
        )
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit', newBooking);
        handleClick(newBooking);
        setNewBooking(booking || new Booking('', '', '', 0, new Customer('', '', '', '')));
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
                    switch (key) {
                        case "time":
                            inputField = renderSelectField(key, newBooking[key as keyof Booking], ["18:00", "21:00"]);
                            break;
                        case "numberOfGuests":
                            inputField = renderInputField(key, newBooking[key as keyof Booking] || '', "number");
                            break;
                        case "date":
                            inputField = renderInputField(key, newBooking[key as keyof Booking] || '', "date");
                            break;
                        default:
                            inputField = renderInputField(key, newBooking[key as keyof Booking] || '', "text");
                            break;
                    }

                    return (
                        <div key={index}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            {inputField}
                        </div>
                    )
                })}
                <button type="submit">Boka</button>
            </form>
        </div>
    )

} 