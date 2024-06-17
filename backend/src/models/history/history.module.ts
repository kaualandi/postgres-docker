import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  controllers: [HistoryController],
  imports: [PrismaModule],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
