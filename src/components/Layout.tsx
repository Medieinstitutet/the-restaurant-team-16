import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import Footer from './Footer';
import { BookingsProvider } from '../contexts/BookingsContext';
import '../styles/main.scss';

export const Layout = () => {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main>
                <BookingsProvider>
                    <Outlet />
                </BookingsProvider>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
