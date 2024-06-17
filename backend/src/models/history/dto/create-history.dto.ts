import { ResultType } from '@prisma/client';

export class CreateHistoryDto {
  query: string;
  result: string;
  resultType: ResultType;
  isCritical: boolean;
}
