export interface IAuthModel {
  email: string;
  id: number;
  exp: number;
  iat: number;
  roles: IAuthRoleModel[];
}
interface IAuthRoleModel {
  id: number;
  UserRoles: IUserRoles;
  createdAt: string;
  description: string;
  updatedAt: string;
  value: string;
}

interface IUserRoles {
  id: number;
  roleId: number;
  userId: number;
}
