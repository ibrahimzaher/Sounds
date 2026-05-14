import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { eAuthStateService as AuthStateService } from '@elevate/auth-domain';
import {
  AuthRepo,
  AuthModel,
  MessageModel,
  PasswordModel,
  ProfileModel,
  StatusModel,
} from '@elevate/auth-domain';
import { AuthApiService } from './auth-api.service';
import { AuthMapper } from '../mapper/auth.mapper';
import { AuthStorageService } from '../services/auth-storage.service';
import {
  LoginParams,
  RegisterParams,
  ChangePasswordParams,
  EditProfileParams,
  ForgetPasswordParams,
  VerifyResetCodeParams,
  ResetPasswordParams,
} from '@elevate/auth-domain';

@Injectable()
export class AuthApiRepo extends AuthRepo {
  private readonly _authService = inject(AuthApiService);
  private readonly _storage = inject(AuthStorageService);
  private readonly _state = inject(AuthStateService);

  login(data: LoginParams, rememberMe: boolean): Observable<AuthModel> {
    return this._authService.login(data).pipe(
      map((res) => AuthMapper.toAuthModel(res)),
      tap((auth) => {
        this._storage.saveToken(auth.token, rememberMe);
        this._state.setUser(auth.user);
      })
    );
  }

  register(data: RegisterParams): Observable<AuthModel> {
    return this._authService.register(data).pipe(
      map((res) => AuthMapper.toAuthModel(res)),
      tap((auth) => {
        this._storage.saveToken(auth.token, false);
        this._state.setUser(auth.user);
      })
    );
  }

  profileData(): Observable<ProfileModel> {
    return this._authService.profileData().pipe(
      map((res) => AuthMapper.toProfileModel(res)),
      tap((profile) => this._state.setUser(profile.user))
    );
  }

  logout(): Observable<MessageModel> {
    return this._authService.logout().pipe(
      tap(() => {
        this._storage.removeToken();
        this._state.setUser(null);
      })
    );
  }

  forgetPassword(data: ForgetPasswordParams): Observable<MessageModel> {
    return this._authService
      .forgetPassword(data)
      .pipe(map((res) => AuthMapper.toMessageModel(res)));
  }

  changePassword(data: ChangePasswordParams): Observable<PasswordModel> {
    return this._authService.changePassword(data);
  }
  deleteMe(): Observable<MessageModel> {
    return this._authService.deleteMe();
  }
  editProfile(data: EditProfileParams): Observable<ProfileModel> {
    return this._authService.editProfile(data).pipe(
      map((res) => AuthMapper.toProfileModel(res)),
      tap((data) => this._state.setUser(data.user))
    );
  }
  uploadPhoto(data: FormData): Observable<MessageModel> {
    return this._authService.uploadPhoto(data).pipe(
      map(() => ({ message: 'success' })) // Map to MessageModel manually since API might return varying format
    );
  }
  verifyResetCode(data: VerifyResetCodeParams): Observable<StatusModel> {
    return this._authService.verifyResetCode(data);
  }
  resetPassword(data: ResetPasswordParams): Observable<PasswordModel> {
    return this._authService.resetPassword(data);
  }
  cleanData() {
    this._storage.removeToken();
    this._state.setUser(null);
  }
}
