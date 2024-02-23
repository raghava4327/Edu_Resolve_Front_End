import React, { useState } from "react";
import Button from "../Components/Button";
import FormInput from "../Components/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const formFields = [
  { label: "Name", id: "name", placeholder: "Enter name", required: true },
  {
    label: "Email",
    id: "emailId",
    placeholder: "Enter email",
    required: true,
    type: "email",
  },
  {
    label: "Age",
    id: "age",
    placeholder: "Enter Age",
    required: true,
    type: "number",
  },
  { label: "Grade", id: "grade", placeholder: "Enter Grade", required: true },
  {
    label: "School",
    id: "school",
    required: true,
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  {
    label: "Phone number",
    id: "phoneNumber",
    placeholder: "Enter Phone number",
    required: true,
    pattern: "\\d{10}",
    title: "Phone number should be 10 digits",
  },
  {
    label: "Password",
    id: "password",
    placeholder: "Enter password",
    type: "password",
    required: true,
    minLength: 8,
    title: "Password must be at least 8 characters long",
  },
];

const StudentRegistration = () => {
  const [institutions, setInstitutions] = useState([]);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    emailId: "",
    grade: "",
    age: "",
    gender: "",
    school: "",
    password: "",
  });
  React.useEffect(() => {
    async function fetchSchools() {
      const res = await axios.get(
        "http://localhost:9000/students/getAllSchools"
      );
      setInstitutions(res.data);
    }
    fetchSchools();
  }, []);

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:9000/students/register",
        formData
      );
      console.log("From server", response.data);
      navigate("/studentLogin");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="xl:mx-auto">
      <p className="text-center mt-5 font-bold font-Montserrat text-3xl">
        Student Signup
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-10 my-2 xl:grid xl:grid-cols-2 gap-4"
      >
        {formFields.map((field, index) =>
          field.id === "school" ? (
            <div key={index} className="mt-10 xl:mt-3">
              <label
                htmlFor={field.id}
                className="text-2xl xl:text-xl xl:flex xl:gap-4 xl:items-center font-Montserrat cursor-pointer"
              >
                {field.label}
              </label>
              <select
                id={field.id}
                className="form-select border font-Montserrat border-[#D3C9C9] bg-white shadow-lg w-full mt-5 xl:py-2 py-5 px-2 text-xl xl:text-lg"
                onChange={handleChange}
                value={formData[field.id]}
                required={field.required}
              >
                <option value="">Please select...</option>
                {institutions.map((ele, index) => (
                  <option key={index} value={ele.institution}>
                    {ele.institution}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <FormInput key={field.id} {...field} onChange={handleChange} />
          )
        )}
        <Button
          type="submit"
          style="border-none text-white font-Montserrat text-3xl xl:text-2xl leading-normal rounded bg-[#917A68] my-2.5 mx-auto px-10 mt-2 shadow-lg w-full py-4 hover:bg-[#282323] hover:font-bold cursor-pointer col-span-2"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default StudentRegistration;
