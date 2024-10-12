import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User, UserRoles } from './models';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, UpdateUserImageDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected, Roles } from '@decorators';
import { multerConfig } from '@config';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Barcha userlarni olish' })
  @Get("/")
  async getAllUsers(): Promise<User[] | string> {
    return await this.service.getAllUsers();
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Userni idsi bo\'yicha olish' })
  @Get("/:userId")
  async getUserById(@Param("userId", ParseIntPipe) userId: number): Promise<User | string> {
    return await this.service.getUserById(userId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Yangi user yaratish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    // console.log(image, "**")
    await this.service.createUser({ ...payload, image: image ? image.filename : "user.png"});
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Userni update qilish' })
  @ApiConsumes('multipart/form-data')
  @Patch('/update/:userId')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void | string> {
    return await this.service.updateUser(userId, {...payload, image: image ? image.filename : "user.png"});
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete/:userId')
  @ApiOperation({ summary: "Userni o'chirish" })
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void | string> {
    return await this.service.deleteUser(userId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete')
  @ApiOperation({ summary: "Hamma Userlarni o'chirish" })
  async deleteAllUsers(): Promise<void | string> {
    return await this.service.deleteAllUsers();
  }
}
