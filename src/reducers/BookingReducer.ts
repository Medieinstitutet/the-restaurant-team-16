import { Booking } from "../models/Booking";

export type IAction =
    {type: ActionType.ADD, payload: Booking} | {type: ActionType.REMOVE, payload: number} | {type: ActionType.SET_BOOKINGS, payload: Booking[]}

export enum ActionType { 
    ADD,
    REMOVE,
    SET_BOOKINGS,
}

export const BookingReducer = (state: Booking[], action: IAction): Booking[] => {
    console.log('reducer', state);
    switch (action.type) {
        case ActionType.SET_BOOKINGS:
            return action.payload;
        case ActionType.ADD:
            console.log('click add');
            return [...state, action.payload];
        // case ActionType.REMOVE:
        //     return bookings.filter((booking) => booking !== action.payload);
        default:
            return state;
    }
}