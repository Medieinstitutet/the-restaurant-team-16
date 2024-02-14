
import { Link } from "react-router-dom";

export const Home = () => {
  return <>
    <button><Link to={'/booking-page'}>Boka bord</Link></button>
  </>;
}