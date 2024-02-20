import React, { useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
const AdminHome = () => {
  const [localAdmins, setLocalAdmins] = React.useState([]);
  const [mentors, setMentors] = React.useState([]);
  const [table, setTable] = useState(true);
  const { _id, token } = JSON.parse(localStorage.getItem("admin"));
  const fetchLocalAdminsData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/globaladmins/getAllLocalAdmins",
        { token: token, id: _id }
      );
      setLocalAdmins(res.data);
    } catch (error) {
      console.log("My error", error);
    }
  };
  const fetchMentorsData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/globaladmins/getAllMentors",
        { token: token, id: _id }
      );
      setMentors(res.data);
    } catch (error) {
      console.log("My error", error);
    }
  };

  React.useEffect(() => {
    fetchLocalAdminsData();
  }, []);
  React.useEffect(() => {
    fetchMentorsData();
  }, []);
  function toggle() {
    setTable((prev) => !prev);
  }
  return (
    <>
      <ul className="list-none flex justify-center gap-10 mt-10 ">
        <li>
          <button
            disabled={!table}
            className={`border-none font-Montserrat text-xl rounded my-2.5 mx-auto px-5  w-full py-2 ${table ? "text-slate-600 cursor-pointer" : "text-slate-300 cursor-not-allowed"}`}
            onClick={toggle}
          >
            Organisation
          </button>
        </li>
        <li>
          <button
            className={`border-none font-Montserrat text-xl rounded my-2.5 mx-auto px-5  w-full py-2  ${!table ? "text-slate-600 cursor-pointer" : "text-slate-300 cursor-not-allowed"}`}
            onClick={toggle}
            disabled={table}
          >
            Mentors
          </button>
        </li>
      </ul>
      {/* {console.log(table)} */}
      {table
        ? localAdmins && (
            <Table
              users={mentors}
              type="mentors"
              refreshData={fetchMentorsData}
            />
          )
        : localAdmins && (
            <Table
              users={localAdmins}
              type="org"
              refreshData={fetchLocalAdminsData}
            />
          )}
    </>
  );
};

export default AdminHome;
