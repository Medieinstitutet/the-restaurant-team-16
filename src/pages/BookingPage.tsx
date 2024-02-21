import { Booking } from "../models/Booking";
import { createBooking } from "../Services/BookingService";
import { BookingForm } from "../components/BookingForm";
import { useBookings } from "../contexts/BookingsContext";
import { ActionType } from "../reducers/BookingReducer";
import { useState } from "react";
import { Message, MessageType } from "../components/Message";
import Button, { ITheme } from "../components/Button";

export const BookingPage = () => {
    const { dispatch } = useBookings();
    const [hideForm, setHideForm] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: MessageType } | null>(null);
    const [showMessage, setShowMessage] = useState(false);

    const addNewBooking = async (newBooking: Booking) => {
        try {
            const createdBooking = await createBooking(newBooking);
            console.log(typeof createdBooking, newBooking);
            dispatch({ type: ActionType.ADD, payload: createdBooking });
            setHideForm(true);
            setShowMessage(true);
            setMessage({ text: `Tack ${newBooking.customer.name} ${newBooking.customer.lastname} för din bokning`, type: MessageType.SUCCES });
            setTimeOutMessage();

        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    }

    const setTimeOutMessage = () => {
        setTimeout(() => {
            setMessage(null);
            setShowMessage(false);
        }, 3000);
    }

    return <>
        {!hideForm ? <BookingForm handleClick={addNewBooking} /> : <div>
            {showMessage && <Message text={message!.text} type={message!.type} />}
            <Button text="Boka igen" theme={ITheme.PRIMARY} handleClick={() => {
                setHideForm(false)
                location.reload()
            }}></Button>
        </div>}
    </>
}





