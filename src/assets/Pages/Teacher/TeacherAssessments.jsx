import React from "react";
import FormInput from "../../Components/FormInput";
import QuestionCard from "./QuestionCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TeacherAssessments = () => {
  const [formData, setFormData] = React.useState({ subject: "", class: "" });
  const { name, _id, token, institution } = JSON.parse(
    localStorage.getItem("teacher")
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const notify = () => toast.success(" Assessment submitted successfully");
  console.log(formData);
  return (
    <div>
      <p className="text-xl text-center mt-4 font-bold">Post Assessments</p>
      <div className="mx-10  lg:grid lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form className="lg:mx-5 lg:my-10 ">
            <div className="flex gap-10 lg:block">
              <FormInput
                label="select subject"
                type="select"
                options={[
                  "Physics",
                  "Maths",
                  "Telugu",
                  "Hindi",
                  "English",
                  "Social",
                  "Chemistry",
                ]}
                id="subject"
                required={true}
                onChange={handleChange}
                value={formData.subject}
              ></FormInput>
              <FormInput
                label="select class"
                type="select"
                options={["6th", "7th", "8th", "9th", "10th"]}
                required={true}
                id="class"
                onChange={handleChange}
                value={formData.class}
              ></FormInput>
            </div>
          </form>
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
        </div>

        {!(formData.class && formData.subject) ? (
          <div className=" col-span-2 flex items-center justify-center">
            Select the Subject and Class options to post the assessment here
          </div>
        ) : (
          <div className="text-center col-span-2 mt-10 ">
            <QuestionCard
              stuclass={formData.class}
              subject={formData.subject}
              name={name}
              id={_id}
              token={token}
              school={institution}
              refresh={() => setFormData({ subject: "", class: "" })}
              notify={notify}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAssessments;
