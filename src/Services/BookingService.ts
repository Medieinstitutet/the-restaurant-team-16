import { Booking } from "../models/Booking"
import { get, post } from "./serviceBase"

const API_BASE_URL = "https://school-restaurant-api.azurewebsites.net/"

export const createRestaurant = async () => { 
    const response = await post(`${API_BASE_URL}restaurant/create`, {
  name: "The Golden Fork",
  address: {
    street: "Västerlånggatan 68",
    zip: "11129",
    city: "Stockholm"
  }
    }
    )
    console.log(response.data)
}

export const getBookings = async () => {
  try { 
     const response = await get<Booking[]>(`${API_BASE_URL}booking/restaurant/65cb4a68505ba22f8dc6636f`)
     return response.data
  }
  catch(error) {
    console.error('Error geting bookings:', error);
    throw error
  }
}

export const createBooking = async (newBooking: Booking): Promise<Booking> => {
  try {
    const response = await post<Booking>(`${API_BASE_URL}booking/create`, newBooking)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error
   }
}
