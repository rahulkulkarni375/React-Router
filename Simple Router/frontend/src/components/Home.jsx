import React, { useState, useEffect } from "react";
import Table from "./Table";

// const ITEMS_PER_PAGE = 10;

export default function Home() {
  
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hide, setHide] = useState(false);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log("Students are listed!", data);
      setStudents(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {!hide && students.length > 0 && (
        <>
         <Table students={students} currentPage={currentPage} itemsPerPage={5}/>
        </>
      )}
      {console.log("students ",students)}
      {students.length <= 0 && <h4>No Students !</h4>}
    </>
  );
}
