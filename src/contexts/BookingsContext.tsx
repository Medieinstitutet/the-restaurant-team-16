import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";
import {
  ActionType,
  BookingReducer,
  IAction
} from "../reducers/BookingReducer";
import { getBookings } from "../Services/BookingService";
import { IBooking } from "../models/IBooking";

export interface IBookingsContext {
  bookings: IBooking[];
  dispatch: Dispatch<IAction>;
}

const initialState: IBookingsContext = { bookings: [], dispatch: () => {} };

export const BookingsContext = createContext<IBookingsContext>(initialState);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(BookingReducer, initialState.bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings: IBooking[] = await getBookings();
      dispatch({ type: ActionType.SET_BOOKINGS, payload: bookings });
    };

    fetchBookings();
  }, []);

  return (
    <BookingsContext.Provider value={{ bookings: state, dispatch }}>
      {children}
    </BookingsContext.Provider>
  );
};
export const useBookings = () => useContext(BookingsContext);
