import { Booking } from "../models/Booking";
import { createBooking } from "../Services/BookingService";
import { BookingForm } from "../components/BookingForm";
import { useBookings } from "../contexts/BookingsContext";
import { ActionType } from "../reducers/BookingReducer";


export const BookingPage = () => {
    const { dispatch } = useBookings();

    const handleClick = () => {
        console.log('kicka på knappen');

    }

    const addNewBooking = async (newBooking: Booking) => {
        try {
            const createdBooking = await createBooking(newBooking);
            console.log(typeof createdBooking, newBooking);
            dispatch({ type: ActionType.ADD, payload: createdBooking });
        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    }

    return <>
        <button onClick={handleClick}>Boka bord</button>
        <BookingForm handleClick={addNewBooking} />
    </>
}





