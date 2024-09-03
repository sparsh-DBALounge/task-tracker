export const mapRoleToId = (roles, roleDesc) => {
  const role = roles.find((role) => role.role === roleDesc);
  return role ? role.id : null;
};
