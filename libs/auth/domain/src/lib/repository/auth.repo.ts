import { Observable } from 'rxjs';
import {
  AuthModel,
  MessageModel,
  PasswordModel,
  ProfileModel,
  StatusModel,
} from '../models/auth.model';
import {
  ChangePasswordParams,
  EditProfileParams,
  ForgetPasswordParams,
  LoginParams,
  RegisterParams,
  ResetPasswordParams,
  VerifyResetCodeParams,
} from '../models/auth-params.model';

export abstract class AuthRepo {
  abstract login(data: LoginParams, remberMe: boolean): Observable<AuthModel>;
  abstract register(data: RegisterParams): Observable<AuthModel>;
  abstract changePassword(
    data: ChangePasswordParams
  ): Observable<PasswordModel>;
  abstract deleteMe(): Observable<MessageModel>;
  abstract logout(): Observable<MessageModel>;
  abstract profileData(): Observable<ProfileModel>;
  abstract editProfile(data: EditProfileParams): Observable<ProfileModel>;
  abstract uploadPhoto(photo: FormData): Observable<MessageModel>;
  abstract forgetPassword(data: ForgetPasswordParams): Observable<MessageModel>;
  abstract verifyResetCode(
    data: VerifyResetCodeParams
  ): Observable<StatusModel>;
  abstract resetPassword(data: ResetPasswordParams): Observable<PasswordModel>;
  abstract cleanData(): void;
}
