export interface IApartament {
  title: string;
  description: string;
  address: string;
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
