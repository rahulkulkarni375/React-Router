import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Update() {
    const navigate = useNavigate();
  return (
    <>
        <h1>Update</h1>
        <br />
        <button onClick={() => navigate('/')}>Go Back to Home</button>
    </>
  )
}
