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
    console.log(response)
}

export const getBookings = async () => {
  const response = await get(`${API_BASE_URL}booking/restaurant/65cb4a68505ba22f8dc6636f`)
 console.log(response)
}
