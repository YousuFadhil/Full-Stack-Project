import React from "react";
import { useSelector } from "react-redux";
import userImage from "../Images/user.png"; // تأكد من وجود الصورة في المسار الصحيح
import Location from "./Location"; // تأكد من وجود مكون Location.js

const User = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  return (
    <div className="user-container d-flex align-items-center justify-content-center">
      <div className="form-container p-4 rounded shadow bg-white">
        <div className="text-center mb-4">
          <img src={userImage} alt="User" className="small-image rounded-circle" />
          <h2 className="text-primary mt-3">User Profile</h2>
        </div>

        {/* معلومات المستخدم */}
        <form className="user-form">
          <div className="form-group mb-3">
            <label className="form-label fw-bold">Welcome</label>
            <input
              type="text"
              value={name || "Guest"}
              className="form-control"
              readOnly
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              value={email || "No Email Provided"}
              className="form-control"
              readOnly
            />
          </div>

          {/* موقع المستخدم */}
          <div className="location-container mt-4">
            <h5 className="text-primary fw-bold mb-2">Your Location</h5>
            <div className="border rounded p-2">
              <Location />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
