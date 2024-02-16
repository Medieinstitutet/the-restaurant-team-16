import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Booking } from '../models/Booking';
import { ActionType, BookingReducer, IAction } from '../reducers/BookingReducer';
import { getBookings } from '../Services/BookingService';

export interface IBookingsContext {
  bookings: Booking[];
  dispatch: Dispatch<IAction>;
}

const initialState: IBookingsContext = { bookings: [], dispatch: () => {} };

export const BookingsContext = createContext<IBookingsContext>(initialState);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(BookingReducer, initialState.bookings);

  //? This is the old way of doing it
  //Todo: Refactor to use the new way of doing it
  useEffect(() => {
    //   if (state.bookings.length > 0) return;

    // const getBookingsData = async () => {
    //     const data = await getBookings();
    //     console.log(data);
    //     if (shouldUpdateBookings) {
    //         dispatch({ type: ActionType.SET_BOOKINGS, payload: data });
    //     }
    // }
    // let shouldUpdateBookings = true;
    // getBookingsData();
    // return () => {
    //     shouldUpdateBookings = false;
    // }

    const fetchBookings = async () => {
      const bookings: Booking[] = await getBookings();
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
