import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { ICreateUserRequest, IUpdateUserRequest } from './interfaces';
import { hash } from 'bcrypt';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAllUsers(): Promise<User[] | string> {
    const users = await this.userModel.findAll({
      include: [],
    });
    // console.log(data[0]?.dataValues)
    if (!users) {
      return 'Any User not found';
    }
    return users;
  }

  async getUserById(userId: number): Promise<User | string> {
    const user = await this.userModel.findByPk(userId, { include: [] });
    if (!user) {
      return 'User not found';
    }
    return user;
  }

  async createUser(payload: ICreateUserRequest): Promise<void> {
    // console.log(payload.image, "*")
    const hashedPassword = await hash(payload.password, 12);
    await this.userModel.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      image: payload.image,
      role: payload.role,
    });
  }

  async updateUser(
    userId: number,
    payload: IUpdateUserRequest,
  ): Promise<void | string> {
    // console.log(user) // // null
    const existUser = await this.userModel.findByPk(userId);

    if (!existUser) {
      return "User not found";
    }

    if (existUser.image && existUser.image != 'user.png') {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existUser.image),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    const hashedPassword = await hash(payload.password, 12);

    await existUser.update({
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      image: payload.image,
      role: payload.role,
    });
  }

  async deleteUser(userId: number): Promise<void | string> {
    const existUser = await this.userModel.findByPk(userId);

    if (!existUser) {
      return 'User not found';
    }

    if (existUser.image && existUser.image != 'user.png') {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existUser.image),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    await this.userModel.destroy({ where: { id: userId } });
  }

  async deleteAllUsers(): Promise<void | string> {
    const allUsers = await this.userModel.findAll();

    // console.log(allUsers[0]?.dataValues)
    if (!allUsers[0]?.dataValues) {
      return 'Any User not found';
    }

    allUsers.forEach((u) => {
      if (u.image && u.image != 'user.png') {
        unlink(join(__dirname, '..', '..', '..', 'uploads', u.image), (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        });
      }
    });

    await this.userModel.truncate();
  }
}
