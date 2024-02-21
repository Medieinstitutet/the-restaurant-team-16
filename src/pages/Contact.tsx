import contactIMG from "../assets/img9.webp";
import contactIMG2 from "../assets/img6.webp";

export const Contact = () => {
  return (
    <div className="contact_wrapper">
      <h1>Contact Us</h1>
      <section className="first_section">
        <article className="first_article">
          <h3>Information</h3>
          <p>
            Welcome to The Golden Fork, Stockholm's premier dining destination.
          </p>
          <p>
            Renowned as the most celebrated restaurant in Sweden, we pride
            ourselves on our exceptional culinary creations and unparalleled
            dining experience.
          </p>
          <p>
            Our accolades and ratings reflect our commitment to excellence and
            innovation in the culinary world. Whether you're a long-time patron
            or a first-time visitor, your feedback and experiences are
            invaluable to us.
          </p>
        </article>
        <div>
          <img className="contact_img" src={contactIMG} alt="" />
        </div>
      </section>
      <section className="second_section">
        <article className="second_article">
          <h3>Visit Us</h3>
          <p>
            The Golden Fork<br />
            1234 Golden Fork Street<br />
            123 45 Golden City<br />
            Open daily from 11:00 AM to 11:00 PM.
          </p>
          <h3>Contact</h3>
          <p>
            Phone: 123 456 789<br />
            Email: example@email.com
          </p>
        </article>
        <div>
          <img className="contact_img" src={contactIMG2} alt="" />
        </div>
      </section>
    </div>
  );
};
