import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState();
  // getUsers
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data.success) {
        setUsers(data?.data);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // antd table col

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctors",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>All Users</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
