import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditableForm from "./EditableForm";

export default function Edit() {
  const navigate = useNavigate();

  const [emailExists, setEmailExists] = useState(false);
  const [existingData, setExistingData] = useState({});
  const [email, setMail] = useState();
  const [mailErr, setMailErr] = useState(false);
  const [updatingData, setUpdatingData] = useState();

  const isMailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  async function checkEmailExists(email) {
    const response = await fetch(`http://localhost:5000/get-email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("data ",data.length);
    if (response.ok) {
      setUpdatingData(data);
      // console.log("up dt ",updatingData.data);    
        setEmailExists(true);
      // setExistingData(data[0]); // Assuming only one record will be returned
    } else {
      setEmailExists(false);
    }
  }

  const handleMailChange = (e) => {
    const value = e.target.value;
    setMail(value);
    setEmailExists(false);

    if (!isMailValid(value) && value !== "") setMailErr(true);
    else setMailErr(false);
  };
  const handleRefresh = () =>{
    setEmailExists(false);
    setMail("");
  }
  const handleClickMail = (e) => {
    e.preventDefault();
    checkEmailExists(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEmailExists(email);
    setMail("");
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto p-2 text-start text-uppercase"
          style={{ width: "650px" }}
        >
          <label className="form-label">
            Student Mail ID <span style={{ color: "#D16666" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleMailChange}
            className="form-control mb-2"
            placeholder="Enter Student Mail ID"
            required
          />
          {mailErr && (
            <p style={{ color: "#D16666", fontSize: "0.8em" }}>
              Invalid Student Email !
            </p>
          )}
        </div>
        <button
          type="reset"
          className="mx-2 mt-2 mb-2 btn btn-primary"
          style={{ width: "20rem" }}
          onClick={handleRefresh}
        >
          Refresh
        </button>
        <button
          className="mt-2 mb-2 btn btn-success "
          style={{ width: "20rem" }}
          type="submit"
          onClick={handleClickMail}
        >
          Search
        </button>
      </form>
      <br />
      {emailExists && <EditableForm data={updatingData} />}
      {!updatingData  && <b> Note : Please proceed to the registration page. If user not found !!</b>}
      <br />
    </>
  );
}
