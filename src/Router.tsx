import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { BookingPage } from './pages/BookingPage';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import Admin from './pages/Admin';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      }, {
        path: "/booking-page",
        element: <BookingPage />
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
]);
