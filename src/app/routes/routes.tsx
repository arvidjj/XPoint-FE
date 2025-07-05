import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import Layout from '../../components/Layout';
import InitServicio from './initservicio/InitServicio';

// Lazy load page components
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Appointments = lazy(() => import('./appointments/Appointments'));
const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));
const Home = lazy(() => import('./home/Home'));
const Booking = lazy(() => import('./booking/Reserva'));
const MisReservas = lazy(() => import('./booking/MisReservas'));
const Servicios = lazy(() => import('./booking/Servicios'));

// Loading component
const Loading = () => <div>Loading...</div>;

// Define routes
const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>   
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/', //should be default
    element: (
      <Layout>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
      </Layout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: '/appointments',
    element: (
      <Layout>
        <Suspense fallback={<Loading />}>
          <Appointments />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <div>Not Found</div>
      </Layout>
    ),
  },
  {
    path: '/booking',
    element: (
      <Layout>
        <Suspense fallback={<Loading />}>
          <Booking />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: '/mis-reservas',
    element: (
      <Layout>
        <Suspense fallback={<Loading />}>
          <MisReservas />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: '/servicios',
    element: (
      <Layout>
        <Suspense fallback={<Loading />}>
          <Servicios />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: '/initservicio',
    element: (
        <Suspense fallback={<Loading />}>
          <InitServicio />
        </Suspense>
    ),
  },
];

export default routes;
