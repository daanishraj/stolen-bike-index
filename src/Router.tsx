import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './pages/search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
