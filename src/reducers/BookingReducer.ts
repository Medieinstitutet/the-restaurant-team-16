import { createBooking } from "../Services/BookingService";
import { Booking } from "../models/Booking";

export interface IAction {
    type: ActionType;
    payload: Booking; 
}

export enum ActionType { 
    ADD,
    REMOVE
}

export const BookingReducer = (bookings: Booking[], action: IAction) => {
    switch (action.type) {
        case ActionType.ADD:
            console.log('click add');
            createBooking(action.payload).then((response) => {
                console.log('response', response);
                return [...bookings, action.payload];
            })
            console.log('bookings', bookings);
            return bookings;
        // case ActionType.REMOVE:
        //     return bookings.filter((booking) => booking !== action.payload);
        default:
            return bookings;
    }
}