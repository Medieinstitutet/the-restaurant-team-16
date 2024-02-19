import { getCustomersId } from "../Services/BookingService";
import { IBooking } from "../models/IBooking";

export interface IRespons {
    acknowledged: boolean;
    insertedId: string;
}

export type IAction =
    {type: ActionType.ADD, payload: IRespons} | {type: ActionType.REMOVE, payload: number} | {type: ActionType.SET_BOOKINGS, payload: IBooking[]}

export enum ActionType { 
    ADD,
    REMOVE,
    SET_BOOKINGS,
}

export const BookingReducer = (state: IBooking[], action: IAction): IBooking[] => {
    console.log('reducer', state);
    switch (action.type) {
        case ActionType.SET_BOOKINGS:
            return action.payload;
        case ActionType.ADD:
            console.log('click add', action.payload, "state", state);
            getCustomersId(action.payload.insertedId).then((data) => { 
                console.log("data",data);
                return [...state, data];
            });
            return state;
        // case ActionType.REMOVE:
        //     return bookings.filter((booking) => booking !== action.payload);
        default:
            return state;
    }
}