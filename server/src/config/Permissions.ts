import { Role } from "../database/models/User";

interface Permissions {
  [key: string]: {
    [key: string]: string;
  };
}

export const permissions: Permissions = {
  basic: {
    read: "read",
    write: "write",
    delete: "delete",
  },
};

const userPermissions = [permissions.basic.read];
const adminPermissions = [...userPermissions, permissions.basic.write];
const superAdminPermissions = [...adminPermissions, permissions.basic.delete];

export const getPermissions = (roles: Role[]) => {
  if (roles.includes(Role.SUPERADMIN)) return superAdminPermissions;
  if (roles.includes(Role.ADMIN)) return adminPermissions;
  if (roles.includes(Role.USER)) return userPermissions;
  return null;
};
