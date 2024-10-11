import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRoles } from './models';
import { ICreateUserRequest } from './interfaces';
import { hash } from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const data = await this.userModel.findAll({
      include: [],
    });
    return data;
  }

  async createUser(payload: ICreateUserRequest): Promise<void> {
    // console.log(payload, "*")
    const hashedPassword = await hash(payload.password, 12)
    await this.userModel.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        image: payload.image_url,
        role: payload.role,
    })
}

  // async uploadUserImage(payload: UploadUserImageRequest): Promise<void> {
  //   // CHECK IF USER EXISTS
  //   await this.#_checkUser(payload.userId);

  //   const foundedUser = await this.userModel.findByPk(payload.userId);

  //   let imageUrl: null | UploadFileResponse = null;

  //   imageUrl = await this.uploadService.uploadFile({
  //     destination: 'uploads',
  //     file: payload.image,
  //   });

  //   await this.userModel.update(
  //     { image: imageUrl ? imageUrl?.imageUrl : '' },
  //     { where: { id: payload.userId } },
  //   );
  // }

  async deleteUser(userId: number): Promise<void> {
    const foundedUser = await this.userModel.findByPk(userId);

    // if (foundedUser?.image) {
    //   await this.uploadService.removeFile({ fileName: foundedUser.image });
    // }

    await this.userModel.destroy({ where: { id: userId } });
  }

  async #_checkUser(userId: number): Promise<void> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }
  }
}
