import { getBookings } from "../Services/BookingService";

export const Home = () => {


  const handleClick = () => {
    console.log('click');
    getBookings()
  }

  return <>

    <button onClick={handleClick}></button>
  </>;
}