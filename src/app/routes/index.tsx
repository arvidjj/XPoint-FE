import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import routes from './routes';

const AppRoutes = () => {
  return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={routes[0].element} />
        <Route path="/register" element={routes[1].element} />
        <Route path="/" element={routes[2].element} />
        <Route path="/booking" element={routes[6].element} />
        <Route path="/mis-reservas" element={routes[7].element} />
        <Route path="/servicios" element={routes[8].element} />
        <Route path="/initservicio" element={routes[9].element} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={routes[3].element} />
          <Route path="/appointments" element={routes[4].element} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={routes[5].element} />
      </Routes>
  );
};

export default AppRoutes;
