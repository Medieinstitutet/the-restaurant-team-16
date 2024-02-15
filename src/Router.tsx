import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
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
      },
      {
        path: '/booking',
        element: <Booking />,
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
