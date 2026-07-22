import React from "react";
import { rbacData } from "../dummys/rbacData";
import { ProfileContext } from "../context/ProfileContext";

const useRBAC = () => {
  const { getMe } = React.useContext(ProfileContext);
  const [currentRole, setCurrentRole] = React.useState(getMe?.role?.name);

  const hasPermission = (permission) => {
    const role = rbacData.find((role) => role.name === currentRole);
    return role ? role.permissions.includes(permission) : false;
  };

  const setRole = (roleName) => {
    if (rbacData.some((role) => role.name === roleName)) {
      setCurrentRole(roleName);
    }
  };

  return {
    currentRole,
    hasPermission,
    setRole,
  };
};

export default useRBAC;
