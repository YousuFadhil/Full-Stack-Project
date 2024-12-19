import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import User from "./User"; // تضمين مكون User

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  return (
    <div>
      {/* عرض مكون User */}
      <User />
    </div>
  );
};

export default Profile;
