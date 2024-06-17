import { BadRequestException, Injectable } from '@nestjs/common';
import { ExecuteDto } from './dto/execute-dto';
import {
  CRITICAL_SQL_COMMANDS,
  QUERY_RAW_COMMANDS,
} from 'src/constants/querys';
import { createHash } from 'crypto';
import {
  INVALID_ROOT_PASS,
  WITHOUT_ROOT_PASS_BACKEND,
  WITHOUT_ROOT_PASS_FRONTEND,
} from 'src/constants/errors';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HistoryService } from '../history/history.service';
import { ResultType } from '@prisma/client';

@Injectable()
export class QuerysService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async execute(body: ExecuteDto) {
    const command = body.query.trim().split(/\s+/)[0].toUpperCase();

    let result: unknown;
    let resultType: ResultType = 'TEXT';

    if (QUERY_RAW_COMMANDS.includes(command)) {
      resultType = 'TABLE';
      try {
        result = await this.queryRaw(body.query);
      } catch (error) {
        console.log('Error in queryRaw', error);
        throw new BadRequestException(error.message);
      }
    } else {
      try {
        result = await this.executeRaw(body.query);
      } catch (error) {
        console.log('Error in executeRaw', error);
        throw new BadRequestException(error.message);
      }
    }

    await this.historyService.create({
      query: body.query,
      resultType,
      result: JSON.stringify(result),
      isCritical: CRITICAL_SQL_COMMANDS.includes(command),
    });

    return {
      type: resultType,
      data: result,
    };
  }

  executeRaw(sql: string) {
    return this.prismaService.$executeRawUnsafe(sql);
  }

  queryRaw(sql: string) {
    return this.prismaService.$queryRawUnsafe(sql);
  }

  validCommandSecurity(sql: string, auth: string) {
    const command = sql.trim().split(/\s+/)[0].toUpperCase();
    const isCritical = CRITICAL_SQL_COMMANDS.includes(command);
    if (isCritical) this.confirmPassword(auth);
    return true;
  }

  confirmPassword(auth: string) {
    if (!process.env.ROOT_PASSWORD) {
      throw new BadRequestException(WITHOUT_ROOT_PASS_BACKEND);
    }

    if (!auth) {
      throw new BadRequestException(WITHOUT_ROOT_PASS_FRONTEND);
    }

    const grant = this.toSHA1(auth) === process.env.ROOT_PASSWORD;
    if (!grant) {
      throw new BadRequestException(INVALID_ROOT_PASS);
    }

    return grant;
  }

  toSHA1(input: string) {
    const hash = createHash('sha1');
    hash.update(input);
    return hash.digest('hex');
  }
}
