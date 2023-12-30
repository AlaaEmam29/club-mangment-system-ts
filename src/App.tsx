import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/app/ProtectedRoute';
import MainLoader from './components/app/MainLoader';

const AppLayout = lazy(() => import('./components/app/AppLayout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'));
const UpdateUser = lazy(() => import('./pages/UpdateUser'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 5 * 1000,
      gcTime: 60 * 1000 * 26 * 24,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: '/login',
    element: (
        <Login />
    ),
  },
  {
    path: '/register',
    element: (
        <Register />
    ),
  },
  { path: '/forget-password', element: <ForgetPassword /> },
  { path: '/update-password', element: <UpdatePassword /> },
  {
    path: '/update-user',
    element: <UpdateUser />,
  },
  { path: '*', element: <div>Not Found</div> },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<MainLoader/>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{ margin: '1rem' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '1.6rem',
            maxWidth: 'fit-content',
            padding: '1.6rem 2.4rem',
            backgroundColor: '#fff',
            color: '#000',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
