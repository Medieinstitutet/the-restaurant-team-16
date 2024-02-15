import { Booking } from "../models/Booking";
import { createBooking } from "../Services/BookingService";
import { BookingForm } from "../components/BookingForm";
import { useBookings } from "../contexts/BookingsContext";
import { ActionType } from "../reducers/BookingReducer";
import { useState } from "react";
import { Message, MessageType } from "../components/Message";


export const BookingPage = () => {
    const { dispatch } = useBookings();
    const [hideForm, setHideForm] = useState(false);

    const addNewBooking = async (newBooking: Booking) => {
        try {
            const createdBooking = await createBooking(newBooking);
            console.log(typeof createdBooking, newBooking);
            dispatch({ type: ActionType.ADD, payload: createdBooking });
            setHideForm(true);

        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    }

    return <>
        {!hideForm ? <BookingForm handleClick={addNewBooking} /> : <Message text="Tack för din bokning" type={MessageType.SUCCES} />}
    </>
}





