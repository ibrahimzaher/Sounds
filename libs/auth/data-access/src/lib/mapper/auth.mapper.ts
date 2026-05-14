import {
  AuthModel,
  UserModel,
  ProfileModel,
  MessageModel,
} from '@elevate/auth-domain';
import {
  LoginRes,
  RegisterRes,
  ProfileDataRes,
  EditProfileRes,
  ForgetPasswordRes,
  UserRes,
} from '../dto/auth-res';

export class AuthMapper {
  private static toUserModel(dto: UserRes): UserModel {
    const baseUrl = 'https://flower.elevateegy.com/uploads/';

    return {
      id: dto._id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      role: dto.role,
      gender: dto.gender,
      photo: dto.photo.startsWith('https')
        ? dto.photo
        : `${baseUrl}${dto.photo}`,
    };
  }

  static toAuthModel(dto: LoginRes | RegisterRes): AuthModel {
    return {
      message: dto.message,
      token: dto.token,
      user: this.toUserModel(dto.user),
    };
  }

  static toProfileModel(dto: ProfileDataRes | EditProfileRes): ProfileModel {
    return {
      message: dto.message,
      user: this.toUserModel(dto.user),
    };
  }

  static toMessageModel(dto: ForgetPasswordRes): MessageModel {
    return {
      message: dto.message,
    };
  }
}
