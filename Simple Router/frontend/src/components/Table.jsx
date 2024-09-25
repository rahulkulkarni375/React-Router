import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Table({ students }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hide, setHide] = useState(false);
  const [view, setView] = useState();
  const navigate = useNavigate();
  const [itemsPerPage , seItemsPerPage] = useState(5);
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(students.length / itemsPerPage);
  
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  function handleDeleteClick() {
    navigate("/delete");
  }

  function handleView(studentDetails) {
    const setData = Object.values(studentDetails);
    setView(setData);
    setHide(true);
    // console.log("V detials ", setData);
  }
  return (
    <>
          {hide && view.length != 0 && (
        <>
          {view.map((item) => {
            return (
              <>
                <table
                  className="table table-hover table-bordered  mx-auto p-2 text-start text-uppercase"
                  style={{ width: "650px" }}
                >
                  <tbody>
                    {Object.keys(item).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{item[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            );
          })}
          <b>Note : Please refresh page to go back !!</b>
        </>
      )}
      {!hide && (
        <>
          <table
            className="table table-hover mx-auto p-2 text-center"
            style={{ width: "650px" }}
          >
            <thead>
              <th colSpan="6">
                <p className="fs-2 text-uppercase">Student Details</p>
              </th>
              <tr>
                <th>STUDENT ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADDRESS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.data.id}</td>
                  <td>{student.data.name}</td>
                  <td>{student.data.email}</td>
                  <td>{student.data.address}</td>
                  <td>
                    <button
                      className="btn btn-success m-2"
                      onClick={() => handleView(student)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={handleDeleteClick}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <label><p className="mx-2">Pages</p></label>
          <input type="number" className="btn mb-1 p-0" style={{width : "3rem"}} value={itemsPerPage} onChange={(event)=>seItemsPerPage(event.target.value)} min={5} max={15}/>
          <br />
          <button
            className="btn btn-primary mx-2 "
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="btn btn-primary mx-2 "
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </>
      )}
    </>
  );
}
