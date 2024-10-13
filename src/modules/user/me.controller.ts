import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { RequestInterface } from '@guards';
import { User } from './models';
import { MeService } from './me.service';

@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(private service: MeService) {}

  // @ApiBearerAuth()
  // @ApiOperation({summary: "Barcha foydalanuvchiga tegishli ma'lumotlarni olish"})
  // @Protected(true)
  // @Roles([UserRoles.user, UserRoles.admin])
  // @Get()
  // async getMe(@Request() request: RequestInterface): Promise<User> {
  //   return await this.service.getMe(request.userId);
  // }
}
