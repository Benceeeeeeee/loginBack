import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userDtoInstance = plainToInstance(CreateUserDto, createUserDto);
    await userDtoInstance.hashPassword();
    return this.db.user.create({ data: userDtoInstance });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }
}