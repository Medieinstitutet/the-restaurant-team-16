import { IBooking } from "../models/IBooking";

export interface IRespons {
    acknowledged: boolean;
    insertedId: string;
}

export type IAction =
    { type: ActionType.ADD, payload: IBooking } | {type: ActionType.PUT, payload: IBooking} | {type: ActionType.REMOVE, payload: string} | {type: ActionType.SET_BOOKINGS, payload: IBooking[]}

export enum ActionType { 
    ADD,
    PUT,
    REMOVE,
    SET_BOOKINGS,
    ADD_BOOKING,
}

export const BookingReducer = (state: IBooking[], action: IAction): IBooking[] => {
    switch (action.type) {
        case ActionType.SET_BOOKINGS:
            return action.payload;
        case ActionType.ADD:
            return [...state, action.payload];
        case ActionType.PUT:
            return state.map((booking) => { 
                if (booking._id === action.payload._id) {
                    return action.payload;
                }
                return booking;
            });   
            
        case ActionType.REMOVE:
            return state.filter((booking) => booking._id !== action.payload);
        default:
            return state;
    }
}