export interface IApartament {
  title: string;
  description: string;
  address: string;
  price: number;
  images?: string[];
}

export interface ISellerUser {
  firstName: string;
  lastName: string;
  email: string;
  DOB: string;
  phoneNumber: string;
  avatar?: string;
  password: string;
}

export interface ILoginSellerUser {
  email: string;
  password: string;
}

export interface IError {
  path: string;
  message: string;
}

export interface ICreateUserResponseAndLogin {
  success: boolean;
  token?: string;
  errors?: IError[];
}

export interface ICreateApartamentResponse {
  success: boolean;
  message?: string;
}
