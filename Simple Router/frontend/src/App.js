import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import RootLayout from "./components/RootLayout";
import NewRegistration from "./pages/NewRegistration";
import Delete from "./pages/Delete";
import Edit from "./pages/Edit";
import Update from "./pages/Update";
import EditableForm from "./pages/EditableForm";
import SearchBox from "./components/SearchBox"


const routers = createBrowserRouter([
  {
    path : '/',
    element : <RootLayout/>,
    errorElement : <h1>Something went wrong</h1>,
    children : [
      { path : '' , element : <Home/> },
      { path : 'register', element : <NewRegistration/> },
      { path : 'search' , element : <SearchBox /> },
      { path : 'modify', element : <Update/>},
      { path : 'edit' , element : <Edit /> },
      { path : 'editForm', element : <EditableForm/>},
      { path : 'delete', element : <Delete />}
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={routers} /> 
  );
}


