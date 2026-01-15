export enum IRole {
  customer = "customer",
  admin = "admin",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userImage: string;
  phoneNumber: string;
  role: IRole;
  isVerified?: boolean;
}
