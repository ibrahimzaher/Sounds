import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ChangePasswordParams,
  EditProfileParams,
  ForgetPasswordParams,
  LoginParams,
  RegisterParams,
  ResetPasswordParams,
  VerifyResetCodeParams,
} from '@elevate/auth-domain';
import { Observable } from 'rxjs';
import {
  ChangePasswordRes,
  DeleteMeRes,
  EditProfileRes,
  ForgetPasswordRes,
  LoginRes,
  LogOutRes,
  ProfileDataRes,
  RestPasswordRes,
  VerifyResetCodeRes,
  UploadPhotoRes,
} from '../dto/auth-res';
import { API_CONFIG } from './api-config.token';
import { AuthApiEndpoints } from './auth-api-end-point';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _config = inject(API_CONFIG);
  login(data: LoginParams): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(
      this._config.baseUrl + AuthApiEndpoints.login,
      data
    );
  }
  register(data: RegisterParams): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(
      this._config.baseUrl + AuthApiEndpoints.register,
      data
    );
  }
  changePassword(data: ChangePasswordParams): Observable<ChangePasswordRes> {
    return this._httpClient.patch<ChangePasswordRes>(
      this._config.baseUrl + AuthApiEndpoints.changePassword,
      data
    );
  }
  deleteMe(): Observable<DeleteMeRes> {
    return this._httpClient.delete<DeleteMeRes>(
      this._config.baseUrl + AuthApiEndpoints.deleteMe
    );
  }
  logout(): Observable<LogOutRes> {
    return this._httpClient.get<LogOutRes>(
      this._config.baseUrl + AuthApiEndpoints.logout
    );
  }
  profileData(): Observable<ProfileDataRes> {
    return this._httpClient.get<ProfileDataRes>(
      this._config.baseUrl + AuthApiEndpoints.profileData
    );
  }
  editProfile(data: EditProfileParams): Observable<EditProfileRes> {
    return this._httpClient.put<EditProfileRes>(
      this._config.baseUrl + AuthApiEndpoints.editProfile,
      data
    );
  }
  uploadPhoto(data: FormData): Observable<UploadPhotoRes> {
    return this._httpClient.put<UploadPhotoRes>(
      this._config.baseUrl + AuthApiEndpoints.uploadPhoto,
      data
    );
  }
  forgetPassword(data: ForgetPasswordParams): Observable<ForgetPasswordRes> {
    return this._httpClient.post<ForgetPasswordRes>(
      this._config.baseUrl + AuthApiEndpoints.forgotPassword,
      data
    );
  }
  verifyResetCode(data: VerifyResetCodeParams): Observable<VerifyResetCodeRes> {
    return this._httpClient.post<VerifyResetCodeRes>(
      this._config.baseUrl + AuthApiEndpoints.verifyResetCode,
      data
    );
  }
  resetPassword(data: ResetPasswordParams): Observable<RestPasswordRes> {
    return this._httpClient.put<RestPasswordRes>(
      this._config.baseUrl + AuthApiEndpoints.resetPassword,
      data
    );
  }
}
