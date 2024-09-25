import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const data = props.data;
  // console.log("data in SBox ", data);

  function handleDeleteClick() {
    navigate('/delete');
  }


  const results = data.filter((item) =>
    item.data.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("Res in search ", results);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Search by Student ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="btn btn-primary m-2" style={{ width: "6rem" }}>
        Seacrch
      </button>

      {results.length > 0 && searchTerm !== "" ? (
        results.map((res) => (
          <div>
            <table
              className="table table-hover mx-auto p-2 text-center"
              style={{ width: "650px" }}
            >
              <tbody>
                <tr key={res.data.id}>
                  <td>{res.data.id}</td>
                  <td>{res.data.name}</td>
                  <td>{res.data.email}</td>
                  <td>{res.data.address}</td>
                  <td><button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </>
  );
};

const Search = () => {
  const [students, setStudents] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log("Students are listed in searchbox!", data);
      setStudents(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    // <div className="mb-3 text-uppercase justify-content-center">
    //   <label className="form-label mx-auto p-2 ">
    //     Student Id <span style={{ color: "#D16666" }}>*</span>{" "}
    //   </label>
    //   <SearchBox data={dummy} />
    // </div>

    <div className="mx-auto p-2 text-start " style={{ width: "650px" }}>
      <div>
        <div className="mb-3">
          <label className="form-label">
            Student ID <span style={{ color: "#D16666" }}>*</span>{" "}
          </label>
          <SearchBox data={students} />
        </div>
      </div>
    </div>
  );
};

export default Search;
