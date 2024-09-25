import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import "../pages/NewRegistration.module.css";

const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const isIdValid = (id) => {
  return validator.isAlphanumeric(id);
};

const isNameValid = (name) => {
  return validator.isAlpha(name);
};

function generateRandomId(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const NewId = generateRandomId(6);

export default function NewRegistration() {
  const navigate = useNavigate();
  const [Id, setId] = useState(NewId);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    id: Id,
    name: Name,
    email: email,
    address: address,
  });

  const handleIdChange = (e) => {
    const value = e.target.value;
    setId(value);
    setFormData({ ...formData, [e.target.name]: value });

    if (!isIdValid(value) && value !== "") {
      setIdError(true);
    } else {
      setIdError(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setFormData({ ...formData, [e.target.name]: value });

    if (!isNameValid(value) && value !== "") setNameError(true);
    else setNameError(false);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFormData({ ...formData, [e.target.name]: value });

    if (!isEmailValid(value) && value !== "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleClear = () => {
    setName("");
    setNameError(false);
    setEmail("");
    setError(false);
    setAddress("");
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/new-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      const data = await response.json();       
      // console.log("Data ", data);
      // console.log("json stringify ", JSON.stringify(formData));
    } catch (err) {
      console.log("json stringify ", JSON.stringify(formData));
    }
    navigate('/');   
  };

  return (
    <>
      {submitted && (
        <div
          className="alert alert-success "
          style={{ width: "22rem" }}
          role="alert"
        >
          Form submitted successfully !
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto p-2 text-start text-uppercase"
          style={{ width: "650px" }}
        >
          <div>
            <div className="mb-3">
              <label className="form-label">
                Student ID : <span style={{ color: "#D16666" }}>*</span>{" "}
              </label>

              <input
                name="id"
                type="text"
                className="form-control"
                value={Id}
                placeholder="Enter Student ID"
                onChange={handleIdChange}
                required
              />
              {idError && (
                <p style={{ color: "#D16666", fontSize: "0.8em" }}>
                  Invalid Student ID !
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                Student Name <span style={{ color: "#D16666" }}>*</span>
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                value={Name}
                placeholder="Enter Student Name"
                onChange={handleNameChange}
                required
              />
              {nameError && (
                <p style={{ color: "#D16666", fontSize: "0.8em" }}>
                  Invalid Student Name !
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                Email Address <span style={{ color: "#D16666" }}>*</span>
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={email}
                placeholder="Enter Student Email"
                onChange={handleEmailChange}
                required
              />
              {error && (
                <p style={{ color: "#D16666", fontSize: "0.8em" }}>
                  Invalid Student Email !
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                Address <span style={{ color: "#D16666" }}>*</span>
              </label>
              <textarea
                name="address"
                className="form-control"
                rows="4"
                value={address}
                placeholder="Enter Student City only"
                onChange={handleAddressChange}
                required
              ></textarea>
            </div>
          </div>
          <div></div>
          {Id && Name && email && address ? (
            <button
              className="btn  btn-warning text-white  mx-1"
              style={{ width: "19rem" }}
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          ) : (
            <button
              className="btn  btn-danger text-white  mx-1"
              style={{ width: "19rem" }}
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="mx-2 btn-success btn text-white "
            style={{ width: "19rem" }}
          >
            Submit
          </button>
        </div>
        <b>Note : Please refresh page before filling the form !!</b>
      </form>
      <br />
    </>
  );
}


