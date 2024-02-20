import React, { useState } from "react";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TeacherLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const notify = (message) => toast.error(message);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/teachers/login",
        formData
      );
      console.log("From server", response.data);
      localStorage.setItem("teacher", JSON.stringify(response.data));
      navigate("/teacher");
    } catch (error) {
      notify("Invalid Username Or Password");
      console.log("no user found", error);
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
        user="teacher"
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default TeacherLogin;
