export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  gender: 'male' | 'female';
}
export interface ChangePasswordParams {
  password: string;
  newPassword: string;
}
export interface EditProfileParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
export interface ForgetPasswordParams {
  email: string;
}
export interface VerifyResetCodeParams {
  resetCode: string;
}
export interface ResetPasswordParams {
  email: string;
  newPassword: string;
}
