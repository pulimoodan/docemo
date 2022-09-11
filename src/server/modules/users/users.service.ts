import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }

  async getCurrent(): Promise<User> {
    const user = await this.prismaService.user.findFirst();

    user.password = '';
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existing = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }

  async updateUser(data: UpdateUserDto, id: string): Promise<User> {
    if (data.password.trim()) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } else {
      return this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data: {
          email: data.email,
        },
      });
    }
  }
}
