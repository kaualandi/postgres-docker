import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuerysModule } from './models/querys/querys.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { HistoryModule } from './models/history/history.module';

@Module({
  imports: [
    QuerysModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
