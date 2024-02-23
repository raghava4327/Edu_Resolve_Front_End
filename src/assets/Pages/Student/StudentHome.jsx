import React from "react";
import { useState, useEffect } from "react";
import { data } from "../../data/facts";
import { quotes } from "../../data/quotes";
import PostCard from "../../Components/PostCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import axios from "axios";

const StudentHome = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ];
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [formData, setFormData] = useState({ postText: "", imageUrl: "" });
  const [randomData, setRandomData] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const { _id, name, token, gender, school } = JSON.parse(
    localStorage.getItem("student")
  );
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Randomly select data and quotes on component mount
    setRandomData(data[Math.floor(Math.random() * data.length)]);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    async function getMessages() {
      try {
        const { data } = await axios.post(
          `http://localhost:9000/messages/getAllMessages`,
          { token: token, id: _id }
        );
        console.log(data); // Now 'messages' should contain the actual messages
        setMessages(data); // Assuming you have a state setter function 'setMessages'
      } catch (e) {
        console.log("Messages are not retreived", e);
      }
    }
    getMessages();
  }, []);

  const handleUploadImageClick = () => {
    setShowImageUpload((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = () => {
    if (formData.imageUrl) {
      toast.success("Image uploaded successfully!", {
        position: "top-center",
      });
      setShowImageUpload(false);
    } else {
      toast.error("Please enter an image URL", {
        position: "top-center",
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    toast.info("Post submitted!", { position: "top-center" });
    console.log("Submitted Data:", formData);
    const data = {
      token: token,
      id: _id,
      school: school,
      messageData: formData.postText,
      gender: gender,
      name: name,
      imageLink: formData.imageUrl,
      tags: "",
    };
    console.log(data);
    await axios.post(
      `http://localhost:9000/messages/addMessage/${_id}@${uuidv4()}`,
      data
    );
    setFormData({ postText: "", imageUrl: "" });
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 m-5 ">
      <ToastContainer />
      {/* Maths and Science Facts */}
      <div
        className="flex-1 shadow-xl rounded-lg overflow-hidden  px-5 py-10 max-h-96 hidden xl:flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#0000008f] bg-opacity-60 backdrop-blur-sm p-5 rounded-lg">
            <h1 className="text-2xl text-center underline underline-offset-4  text-white  drop-shadow-2xl">
              Maths and Science Facts
            </h1>
            <p className="text-sm md:text-base text-white p-5 font-thin">
              {randomData}
            </p>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className=" flex-col w-full flex xl:w-1/2">
        <form className="relative" onSubmit={handleFormSubmit}>
          <textarea
            name="postText"
            placeholder="Post the queries here"
            className="bg-white rounded-lg border resize-none border-gray-300 shadow-lg w-full py-2 px-2 text-lg"
            value={formData.postText}
            onChange={handleInputChange}
          ></textarea>
          <div>
            <div
              className={`absolute top-3 right-3 cursor-pointer ${showImageUpload && "animate-bounce"}`}
              onClick={handleUploadImageClick}
            >
              {/* Image Upload Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 12m4-4v12"
                />
              </svg>
            </div>
            {showImageUpload && (
              <div className="flex gap-10">
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image URL here"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="border border-gray-300 shadow-lg py-2 px-2 text-lg w-3/4"
                />
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="border-none text-white text-xl leading-normal rounded bg-[#917A68] py-1 px-4 hover:bg-[#282323] hover:font-bold cursor-pointer flex-none"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="border-none text-white text-xl leading-normal rounded bg-[#917A68] mx-auto py-1 mt-2 shadow-lg w-full hover:bg-[#282323] hover:font-bold cursor-pointer"
          >
            Submit
          </button>
        </form>
        <div
          style={{
            maxHeight: `${!showImageUpload ? "calc(100vh - 16rem)" : "calc(100vh - 19rem)"}`,
            overflowY: "auto",
            marginTop: "10px",
          }}
        >
          {messages.map((message) => (
            <PostCard key={message._id} user={message} />
          ))}
        </div>
      </div>

      {/* Quotes */}
      <div
        className="flex-1 shadow-xl rounded-lg overflow-hidden justify-center items-center px-5 py-10 max-h-96 hidden xl:flex "
        style={{
          backgroundImage: `url(${backgroundImages[1]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#0000008f] bg-opacity-60 backdrop-blur-sm p-5 rounded-lg">
            <p className="text-sm md:text-base text-white p-5 font-thin">
              {randomQuote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
