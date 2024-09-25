import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const navigate = useNavigate();
  return (
    <>
      <form onSubmit={''}>
      <div className="mx-auto p-2 text-start text-uppercase" style={{ width: "650px" }}>
        <div className="mb-3">
          <label className="form-label">Email address <span style={{ color: "#D16666" }}>*</span></label>
          <input name="stud_email" type="email" className="form-control" value={''} placeholder='Enter Student Email' onChange={''} required />
          {/* {error && <p style={{ color: "#D16666", fontSize: "0.8em" }}>Invalid Student Email !</p>} */}
        </div>
        </div>
      </form>
      <br />
      <button onClick={() => navigate('/')}>Go Back to Home</button>

    </>
  )
}
