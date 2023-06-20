import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ d }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${d?._id}`)}
      >
        <div className="card-header">
          Dr . {d?.firstName} {d?.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specilization:</b> {d?.specialization}
          </p>
          <p>
            <b>Experiance:</b> {d?.experiance}
          </p>
          <p>
            <b>Fees Per Cunsaltation:</b> {d?.feesPerCunsaltation}
          </p>
          <p>
            <b>Address:</b> {d?.address}
          </p>
          <p>
            <b>Timeing:</b> {d?.timings[0]} - {d?.timings[0]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
