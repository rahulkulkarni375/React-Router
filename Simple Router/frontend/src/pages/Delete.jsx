import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const isMailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const checkEmailExists = async (email) => {
  // Mock API call to check if email exists in the database
  // Replace this with your actual API call
  try {
    const response = await fetch("http://localhost:5000/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err in fetching email to delete ", err);
    return false;
  }
};

const Delete = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [mail, setMail] = useState("");
  const [mailErr, setMailErr] = useState(false);
  const [emailExists, setEmailExists] = useState(true);

  const handleClear = () => {
    setMail("");
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleDelete = async() => {
    try {
      const response = await fetch(`http://localhost:5000/students/${mail}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (err) {
      console.log("Error: ", err);
    }
    setIsOpen(false);
    navigate("/");
  };

  const handleMailChange = (e) => {
    const value = e.target.value;
    setMail(value);

    // if (!isMailValid(value) && value !== "") setMailErr(true);
    // else setMailErr(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the email from db else return false
    // if (isMailValid(mail)) {
    //   const exists = await checkEmailExists(mail);
    //   setEmailExists(exists);
    // } else {
    //   setMailErr(true);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isOpen && (
        <div className="dialog justify-content-center">
          <div
            className="mx-auto p-2 text-start text-uppercase"
            style={{ width: "650px" }}
          >
            <label className="form-label">
              Please Enter your Student ID to confirm ?{" "}
              <span style={{ color: "#D16666" }}>*</span>
            </label>
            <input
              type="text"
              name="id"
              value={mail}
              onChange={handleMailChange}
              className="form-control mb-2"
              placeholder="Enter Student ID"
            />
            {mailErr && mail !== "" && (
              <p style={{ color: "#D16666", fontSize: "0.8em" }}>
                Invalid Student Email !
              </p>
            )}
          </div>
          <p></p>
          {!mail ? (
            <button
              className="btn btn-warning m-2"
              style={{ width: "309px" }}
              onClick={handleClose}
            >
              Close
            </button>
          ) : (
            <button
              className="btn btn-warning m-2"
              style={{ width: "309px" }}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
          <button
            className="btn btn-danger m-2"
            style={{ width: "309px" }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </form>
  );
};

export default Delete;
