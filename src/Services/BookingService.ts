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
  const response = await get<Booking[]>(`${API_BASE_URL}booking/restaurant/65cb4a68505ba22f8dc6636f`)
 return response.data
}

export const createBooking = async (newBooking: Booking) => {
    const response = await post<Booking>(`${API_BASE_URL}booking/create`, newBooking)
    console.log(response.data)
}
