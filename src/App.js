import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./Components/routes/PrivateRoute";
import PublicRoutes from "./Components/routes/PublicRoutes";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>

        <Route path="/" element={
          <PublicRoutes>
            <HomePage />
          </PublicRoutes>} />
        <Route path="/Login" element={
          <PublicRoutes><Login /></PublicRoutes>} />
        <Route path="/Register" element={<PublicRoutes><Register /></PublicRoutes>} />
        <Route path="/Dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </>
  );
}

export default App;
