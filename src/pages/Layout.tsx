import { Outlet } from "react-router-dom"
import { Navigation } from "../components/Navigation"

export const Layout = () => {
    return (
      <>
        <header>
          <Navigation />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>&copy; 2024 The Golden Fork</p>
        </footer>
      </>
    );
}