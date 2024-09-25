import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditableForm = (props) => {
  const data = props.data[0].data;
  const navigate = useNavigate();
  const [email, setEmail] = useState(data.email);
  const [name, setName] = useState(data.name);
  const [address, setAddress] = useState(data.address);
  const [fields, setFields] = useState([{ email : email, label: "", value: "" }]);
  const [fieldCount, setFieldCount] = useState(2);

  // console.log("props ", props.data[0].data);

  const handleAddField = () => {
    if (fieldCount > 0) {
      const newFields = [...fields, { label: "", value: "" }];
      setFields(newFields);
      setFieldCount((prevCount) => prevCount - 1);
    }
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    setFieldCount((prevCount) => prevCount + 1);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/modify`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(fields)
        });
        // console.log("Received from update ",response.json())
        navigate('/');
    }
    catch(err){
        console.log("err ",err);
    } 

  };

  const handlenNewName = (event) => {
    setName(event.target.value);
  };

  const handleNewAddress = (event) => {
    setAddress(event.target.value);
  };
  
  const handleClick = () =>{
    if(!fields)
      navigate('/');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-2 text-start text-uppercase"
      style={{ width: "650px" }}
    >
      <label className="form-label">
        Mail Address <span style={{ color: "#D16666" }}>*</span>{" "}
      </label>
      <input
        type="email"
        className="form-control mb-3"
        value={email}
        placeholder="Email"
        readOnly
      />
      <label className="form-label">
        Student Name <span style={{ color: "#D16666" }}>*</span>{" "}
      </label>
      <input
        type="text"
        className="form-control mb-3"
        value={name}
        onChange={handlenNewName}
        placeholder="Name"
      />
      <label className="form-label">
        Address <span style={{ color: "#D16666" }}>*</span>{" "}
      </label>
      <input
        type="text"
        className="form-control mb-3"
        value={address}
        onChange={handleNewAddress}
        placeholder="Address"
      />

      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            className="form-control mb-3"
            name="label"
            value={field.label}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter Field Name (In LowerCase)"
            required
          />
          <input
            className="form-control"
            type="text"
            name="value"
            value={field.value}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter Input Here"
            required
          />
          <button
            className="btn btn-danger mb-2 mt-2 w-25"
            type="button"
            onClick={() => handleRemoveField(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <br />
      {fieldCount === 0 ? (
        <p>Max 3 fields you can add </p>
      ) : (
        <button
          className="btn btn-primary mb-2 w-25"
          type="button"
          onClick={handleAddField}
        >
          Add Field
        </button>
      )}
      <br />
      <button className="btn btn-success mb-2 w-25" type="submit" onClick={handleClick} >
        Submit
      </button>
    </form>
  );
};

export default EditableForm;
