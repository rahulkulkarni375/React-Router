import React from 'react'

export default function More(props){
    const details  = props;

  return (
   <>
   <p>Full details of the student</p>
   <p>{details.student_ID}</p>
   {console.log("details ",details)}
   </>
  )
}
