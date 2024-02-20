import myImage from '../assets/home-img.webp';
import { Link } from 'react-router-dom';
import { ITheme } from '../components/Button';

export const Home = () => {

  return (
    <>
      <h1>Welcome</h1>
      <p className='home_para'>
        For "The Golden Fork," located on the historic Västerlånggatan 68 in the heart of Gamla Stan, Stockholm, we present a menu that reflects a combination of modern innovation and classic flavors. The restaurant offers an exclusive dining experience where each dish is carefully crafted to seduce the senses and provide a memorable meal. "The Golden Fork" welcomes you to a world of exquisite culinary art, where tradition meets creativity in an elegant and inviting atmosphere.
      </p>
      <section>
        <article>
          <i className="fas fa-utensils"></i>
          <h2>Meals</h2>
          <p>Lorem, ipsum dolor.</p>
        </article>
        <article>
          <i className="fas fa-wine-glass"></i>
          <h2>Exquisite Drinks</h2>
           <Link className={`button ${ITheme.PRIMARY}`} to={'/booking-page'}>Reserve a Table</Link>
        </article>
        <article>
          <i className="fas fa-star"></i>
          <h2>Exclusive Quality</h2>
          <p>Lorem ipsum dolor sit ameht dsis</p>
        </article>
      </section>
      <img src={myImage} alt="The Golden Fork " />
    </>
  );
};
