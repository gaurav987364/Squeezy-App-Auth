export interface RegisterDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDataProps {
  email: string;
  password: string;
  userAgent?: string;
}
