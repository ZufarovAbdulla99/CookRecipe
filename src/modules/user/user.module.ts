import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UploadService } from '../upload';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, MeService],
  controllers: [UserController, MeController],
})
export class UserModule {}
