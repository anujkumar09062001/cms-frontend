import React from 'react';

const Card = ({ icon, title, subTitle }) => {
  return <div
    className="row p-2 rounded"
    style={{ backgroundColor: "#f5f5f5" }}
  >
    <div className="col-4 text-primary" style={{ fontSize: 36 }}>
      <i className={icon}></i>
    </div>
    <div className="col-8">
      <div className="fw-bold" style={{ fontSize: 24 }}>{title}</div>
      <div className="" style={{ fontSize: 12 }}>{subTitle}</div>
    </div>
  </div >;
}

export default Card;