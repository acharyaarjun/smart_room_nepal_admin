export type Login = {
  email: string;
  password: string;
};

export type ForgotPassword = {
  email: string | null;
  resetToken: string | null;
  password: string | null;
  confirmPassword: string | null;
  otp: string | null;
};
