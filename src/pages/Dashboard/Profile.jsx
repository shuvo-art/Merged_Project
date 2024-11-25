import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return <div>Profile</div>;
};

export default Profile;
