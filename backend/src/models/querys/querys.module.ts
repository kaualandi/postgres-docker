import { Module } from '@nestjs/common';
import { QuerysService } from './querys.service';
import { QuerysController } from './querys.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { HistoryModule } from '../history/history.module';

@Module({
  controllers: [QuerysController],
  imports: [PrismaModule, HistoryModule],
  providers: [QuerysService],
})
export class QuerysModule {}
