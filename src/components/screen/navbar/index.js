import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-3">
          <Link to="/degree">Degree</Link>
        </div>
        <div className="col-lg-3">
          <Link to="/department">Department</Link>
        </div>
        <div className="col-lg-3">
          <Link to="/hostel">Hostel</Link>
        </div>
        <div className="col-lg-3">
          <Link to="/student">Student</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
