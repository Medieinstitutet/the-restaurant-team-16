import { Booking } from '../models/Booking';
import { IBooking } from '../models/IBooking';
import { IRespons } from '../reducers/BookingReducer';
import { get, post, put, remove } from './serviceBase';

export const API_BASE_URL = 'https://school-restaurant-api.azurewebsites.net/';

export const createRestaurant = async () => {
  const response = await post(`${API_BASE_URL}restaurant/create`, {
    name: 'The Golden Fork',
    address: {
      street: 'Västerlånggatan 68',
      zip: '11129',
      city: 'Stockholm',
    },
  });
  console.log(response.data);
};

export const getBookings = async () => {
  try {
    const response = await get<IBooking[]>(
      `${API_BASE_URL}booking/restaurant/65cb4a68505ba22f8dc6636f`
    );
    return response.data;
  } catch (error) {
    console.error('Error geting bookings:', error);
    throw error;
  }
};

export const createBooking = async (newBooking: Booking): Promise<IRespons> => {
  try {
    const response = await post<Booking>(`${API_BASE_URL}booking/create`, newBooking, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }
};

export const getCustomersId = async (bookingId: string): Promise<IBooking> => {
  try {
    const response = await get<IBooking[]>(`${API_BASE_URL}booking/${bookingId}`);
    console.log("response data", response.data);
    return response.data[0];
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
}

export const updateBooking = async (updatedBooking: IBooking): Promise<void> => {
  try {
    const bookingWithId: IBooking & { id?: string } = {
      ...updatedBooking,
      id: updatedBooking._id,
    }
    
    const response = await put<IBooking>(
      `${API_BASE_URL}booking/update/${updatedBooking._id}`,
      bookingWithId
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update booking:', error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  try {
    await remove(`${API_BASE_URL}booking/delete/${bookingId}`);
  } catch (error) {
    console.error('Failed to delete booking:', error);
    throw error;
  }
};


