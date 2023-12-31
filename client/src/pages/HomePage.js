import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/user/getAllDoctors",

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
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>{doctors && doctors?.map((d, i) => <DoctorList d={d} />)}</Row>
    </Layout>
  );
};

export default HomePage;
