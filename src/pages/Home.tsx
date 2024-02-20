import myImage from '../assets/home-img.webp';
import { Link } from 'react-router-dom';
import { ITheme } from '../components/Button';

export const Home = () => {

  return (
    <>
      <h1>Welcome</h1>
      <p className='home_para'>
        För "The Golden Fork", belägen på den historiska Västerlånggatan 68 i hjärtat av Gamla Stan, Stockholm, presenterar vi en meny som speglar en kombination av modern innovation och klassiska smaker. Restaurangen erbjuder en exklusiv matupplevelse där varje rätt är noggrant utformad för att förföra sinnena och erbjuda en minnesvärd middag. "The Golden Fork" välkomnar dig till en värld av utsökt matkonst, där tradition möter kreativitet i en elegant och inbjudande miljö.
      </p>
      <section>
        <article>
          <i className="fas fa-utensils"></i>
          <h2>Måltider</h2>
          <p>Lorem, ipsum dolor.</p>
        </article>
        <article>
          <i className="fas fa-wine-glass"></i>
          <h2>Utsökta Drycker</h2>
           <Link className={`button ${ITheme.PRIMARY}`} to={'/booking-page'}>Boka bord</Link>
        </article>
        <article>
          <i className="fas fa-star"></i>
          <h2>Exklusiv Kvalitet</h2>
          <p>Lorem ipsum dolor sit ameht dsis</p>
        </article>
      </section>
      <img src={myImage} alt="The Golden Fork " />
    </>
  );
};
