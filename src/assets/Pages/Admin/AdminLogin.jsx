import React, { useState } from "react";
import Login from "../../Components/Login";
import axios from "axios";
import "../../../index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminLogin = () => {
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/globaladmins/login",
        formData
      );
      localStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admin");
    } catch (error) {
      notify("Invalid Username Or Password");
      console.error("no user found", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Login
        user="Admin"
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isAdmin={true}
      />
    </>
  );
};

export default AdminLogin;
