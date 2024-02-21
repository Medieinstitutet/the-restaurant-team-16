const Footer = () => {
  return (
    <section className="footer_container">
      <article className="footer-info">
        <h3>The Golden Fork</h3>
        <p>123 Delicious Street, Tasty City, Yum 45678</p>
        <p>+46 123 456 789 | info@thegoldenfork.com</p>
        <p> Open daily from 11:00 AM to 11:00 PM.</p>
      </article>
      <article className="footer_nav">
        <h4>Navigation</h4>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/booking-page">Reservations</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </article>
      <article className="footer_social">
        <h4>Follow Us</h4>
        <a href="#">Instagram</a> | <a href="#">Facebook</a> |{" "}
        <a href="#">Twitter</a>
      </article>
    </section>
  );
};

export default Footer;
