import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute.js";
import Publicroute from "./components/routes/Publicroute.js";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Publicroute>
              <HomePage />
            </Publicroute>
          }
        />
        <Route
          path="/login"
          element={
            <Publicroute>
              <Login />
            </Publicroute>
          }
        />
        <Route
          path="/register"
          element={
            <Publicroute>
              <Register />
            </Publicroute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
