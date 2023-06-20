import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
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

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Booking Page</h1>
      {doctors && (
        <h1>
          {" "}
          Dr . {doctors?.firstName} {doctors?.lastName}
        </h1>
      )}
    </Layout>
  );
};

export default BookingPage;
