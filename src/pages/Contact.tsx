import contactIMG from "../assets/img9.webp";
import contactIMG2 from "../assets/img6.webp";
import "../styles/Contact.scss";


export const Contact = () => {
    return <>
        <div>
        <h1>Contact Us</h1>
            <section className="section-left">
                <p>
                    <h3>Info</h3>
                    The Golden fork is located in Stockholm, We are the most known resturant in Sweden and our ratings are amazing. If you want to tell us how good our food is you can contact us. You can also visit us at our adress.
                </p>
                <img className="contactIMG" src={contactIMG} alt="" />
            </section>
            <section className="section-right">
                <p>
                    <h3>Adress</h3>
                    1234 Golden Fork Street<br/>
                    123 45 Golden City
                    <h3>Contact</h3>
                    Phone: 123 456 789<br/>
                    Email: example@email.com
                </p>
                <img className="contactIMG" src={contactIMG2} alt="" />
            </section>
            
        </div>
    </>
}