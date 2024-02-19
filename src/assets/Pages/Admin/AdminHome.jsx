import React, { useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
const localadmins = [
  {
    id: 1,
    name: "Raghava",
    email: "sairaghava032@gmail.com",
    institution: "Nalanda",

    status: "Accepted",
  },
];
const mentors = [
  {
    id: 2,
    name: "Raghava",
    email: "sairaghava032@gmail.com",
    subjectExpertise: ["Maths", "Science", "Social"],
    status: "Accepted",
  },
  // Add more users as needed
];
const AdminHome = () => {
  const [localAdmins, setLocalAdmins] = React.useState([]);
  const [table, setTable] = useState(true);
  React.useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(
          "http://localhost:9000/globaladmins/getAllLocalAdmins"
        );
        console.log(res.data);
        setLocalAdmins(res.data);
        // console.log(localAdmins);
      } catch (error) {
        console.log("My eroor", error);
      }
    }
    fetchData();
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
      {console.log(table)}
      {table
        ? localAdmins && <Table users={mentors} type="mentors" />
        : localAdmins && <Table users={localAdmins} type="org" />}
    </>
  );
};

export default AdminHome;
