export const AuthApiEndpoints = {
  login: 'api/v1/auth/signin',
  register: 'api/v1/auth/signup',
  changePassword: 'api/v1/auth/change-password',
  deleteMe: 'api/v1/auth/deleteMe',
  editProfile: 'api/v1/auth/editProfile',
  logout: 'api/v1/auth/logout',
  profileData: 'api/v1/auth/profile-data',
  uploadPhoto: 'api/v1/auth/upload-photo',
  forgotPassword: 'api/v1/auth/forgotPassword',
  verifyResetCode: 'api/v1/auth/verifyResetCode',
  resetPassword: 'api/v1/auth/resetPassword',
} as const;
