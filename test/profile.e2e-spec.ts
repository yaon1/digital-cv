import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('GraphQL профиль (нужна работающая PostgreSQL, DATABASE_URL в .env)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let queries: string[] = [];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
    prisma.$on('query', (e) => queries.push(e.query));
  });

  afterAll(() => app.close());
  beforeEach(() => (queries = []));

  const gql = (query: string) => request(app.getHttpServer()).post('/graphql').send({ query });

  it('отдаёт профиль и вложенные данные из примера ТЗ', async () => {
    const res = await gql('{ profile { name description skills { name } experience { company position } projects { name } } }');
    expect(res.body.errors).toBeUndefined();
    const p = res.body.data.profile;
    expect(p.name).toBe('Сергей Аринин');
    expect(p.skills.length).toBeGreaterThan(10);
    expect(p.experience[0]).toEqual({ company: 'Thai Board (фриланс)', position: expect.any(String) });
    expect(p.projects.length).toBeGreaterThan(3);
  });

  it('вложенный запрос не даёт N+1: один SQL на уровень вложенности', async () => {
    const res = await gql(
      '{ profile { name links { url } skills { name } experience { period achievements { text } } projects { name } } }',
    );
    expect(res.body.errors).toBeUndefined();
    const selects = queries.filter((q) => q.startsWith('SELECT'));
    // profile + links + skills + experience + achievements + projects, независимо от числа записей
    expect(selects).toHaveLength(6);
  });

  it('запрашивает у базы только то, что нужно клиенту', async () => {
    await gql('{ profile { name } }');
    expect(queries.filter((q) => q.startsWith('SELECT'))).toHaveLength(1);
  });

  it('несуществующий slug даёт ошибку', async () => {
    const res = await gql('{ profile(slug: "nobody") { name } }');
    expect(res.body.errors[0].message).toContain('не найден');
  });
});
