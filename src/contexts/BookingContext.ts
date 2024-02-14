import { Dispatch, createContext } from "react";
import { Booking } from "../models/Booking";
import { IAction } from "../reducers/BookingReducer";

export interface IBookingsContext { 
    bookings: Booking[];
    dispatch: Dispatch<IAction>;
}

export const BookingsContext = createContext<IBookingsContext>({
    bookings: [],
    dispatch: () => {}
});