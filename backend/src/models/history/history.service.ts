import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createHistoryDto: CreateHistoryDto) {
    return this.prismaService.history.create({
      data: {
        ...createHistoryDto,
      },
    });
  }

  findAll() {
    return this.prismaService.history.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
