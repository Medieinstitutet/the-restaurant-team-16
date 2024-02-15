import { useEffect } from 'react';
import { getBookings } from '../Services/BookingService';
import './Home.scss';
import myImage from '../assets/home-img.webp';
import { Link } from 'react-router-dom';

export const Home = () => {
  // const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings();
      // setBookings(data);
      console.log(data);
    };
    fetchBookings();
  }, []);

  // const addNewBooking = (newBooking: Booking) => {
  //   console.log('click');
  //   createBooking(newBooking);
  // };

  return (
    <>
      <h1>Welcome</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis odio
        voluptatem vitae quaerat consequuntur ex laboriosam in nobis ea dolor! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Recusandae excepturi maiores
        possimus soluta voluptatum quam minus repellendus ullam distinctio ea neque
        praesentium sit dolore dolorum itaque.
      </p>

      <section>
        <div>
          <p>Opening Hours</p>
          <p>Monday - Friday: 10:00 - 22:00</p>
          <p>Saturday - Sunday: 12:00 - 22:00</p>
        </div>
        <div>
          <p>Address</p>
          <p>1234 Golden Fork Street</p>
          <p>123 45 Golden City</p>
        </div>
        <div>
          <p>Contact</p>
          <p>Phone: 123 456 789</p>
          <p>Email: example@email.com</p>
        </div>
      </section>
      <button><Link to={'/booking-page'}>Boka bord</Link></button>
      {/* <BookingForm handleClick={addNewBooking} /> */}

      <img src={myImage} alt="" />
    </>
  );
};
