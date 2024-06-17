import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { QuerysService } from './querys.service';
import { ExecuteDto } from './dto/execute-dto';
import { Request } from 'express';

@Controller('querys')
export class QuerysController {
  constructor(private readonly querysService: QuerysService) {}

  @Post('execute')
  async execute(@Body() body: ExecuteDto, @Req() req: Request) {
    const auth = req.headers.authorization;
    this.querysService.validCommandSecurity(body.query, auth);
    return this.querysService.execute(body);
  }

  @Get('config')
  async getConfig() {
    return this.querysService.getConfig();
  }
}
