import { actionPermissionBaseOnStatus } from "../dummys/actionPermissionBaseOnStatus";

export const hasPermissionAction = (actionName, status) => {
  const action = actionPermissionBaseOnStatus.find((a) => a.name === actionName);

  if (!action) {
    return false;
  }

  return action.permissions.includes(status);
};
