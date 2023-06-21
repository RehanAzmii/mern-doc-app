import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";

const BookingPage = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [available, setAvailable] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // login user data
  const getUserData = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/getSingleDoctor",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        setDoctors(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================booking func =================================
  const handleBooking = async () => {
    try {
      setAvailable(true);
      if (!date && !time) {
        return alert("Date And time required");
      }
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          time: time,
          date: date,
          userInfo: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        message.success(data.message);
      }
    } catch (error) {
      dispatch();
      console.log(error);
      message.error("something went wrong");
    }
  };

  // check availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/book-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        setAvailable(true);

        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData(hideLoading());
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container">
        {doctors && (
          <div>
            <h4>
              Dr . {doctors?.firstName} {doctors?.lastName}
            </h4>
            <h4>Fees: {doctors?.feesPerCunsaltation}</h4>
            <h4>
              Timeing: {doctors?.timings && doctors?.timings[0]} -{" "}
              {doctors?.timings && doctors?.timings[1]}
            </h4>
            <div className="d-flex flex-column mt-2 w-50">
              <DatePicker
                format="DD-MM-YYYY"
                className="m-2"
                onClick={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
