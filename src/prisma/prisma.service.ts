import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<{ log: [{ emit: 'event'; level: 'query' }] }> implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // события запросов нужны тесту, который проверяет отсутствие N+1
    super({ log: [{ emit: 'event', level: 'query' }] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
