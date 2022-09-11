import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateUserDto) {
    return this.usersService.updateUser(updateAdminDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCurrent() {
    return this.usersService.getCurrent();
  }
}
