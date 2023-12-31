import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtctedRoute from "./components/ProtctedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointment from "./pages/Appointment";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/apply-doctor"
              element={
                <ProtctedRoute>
                  <ApplyDoctor />
                </ProtctedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtctedRoute>
                  <Users />
                </ProtctedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtctedRoute>
                  <Profile />
                </ProtctedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtctedRoute>
                  <BookingPage />
                </ProtctedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtctedRoute>
                  <Doctors />
                </ProtctedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtctedRoute>
                  <NotificationPage />
                </ProtctedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtctedRoute>
                  <Appointment />
                </ProtctedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtctedRoute>
                  <DoctorAppointments />
                </ProtctedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtctedRoute>
                  <HomePage />
                </ProtctedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
