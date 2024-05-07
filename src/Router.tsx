import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './pages/search';
import BikeDetails from './pages/bike';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: '/bikes/:id',
    element: <BikeDetails />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
