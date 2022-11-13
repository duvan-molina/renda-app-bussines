export interface IApartament {
  title: string;
  description: string;
  address: string;
  price: number;
  images?: string[];
  isActive?: boolean;
  numberOfRooms: number;
  numberOfBathRooms: number;
  socialStratum: number;
  pets?: boolean;
  isReting?: boolean;
  furnished?: boolean;
  includedServices: boolean;
  commercialUse: boolean;
  withGarage?: boolean;
  motorcycleStorageSpace?: boolean;
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
