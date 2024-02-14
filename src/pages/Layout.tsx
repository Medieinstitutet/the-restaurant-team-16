import { Outlet } from "react-router-dom"
import { Navigation } from "../components/Navigation"
import { BookingsProvider } from "../contexts/BookingsContext"

export const Layout = () => {
    return (<>
        <header>
            <Navigation />
        </header>
        <main>
            <BookingsProvider>
            <Outlet />
            </BookingsProvider>
        </main>
        <footer>footer</footer>
    </>)
}