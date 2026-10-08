import { createBrowserRouter } from 'react-router';
import { RootLayout } from '../components/layout/RootLayout';
import { HomePage } from '../pages/HomePage';
import { RouteErrorBoundary } from '../components/common/RouteErrorBoundary';
import { CLINIC_INFO } from '../data/clinicData';

/**
 * React Router 7 Data Mode Configuration
 * Uses createBrowserRouter with root layout, data loaders, and error boundaries.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          return {
            clinicInfo: CLINIC_INFO
          };
        }
      }
    ]
  }
]);
