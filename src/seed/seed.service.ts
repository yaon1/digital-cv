import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { seedData, SeedData } from './data';

const toDate = (ym: string) => new Date(`${ym}-01T00:00:00.000Z`);

/**
 * Заполняет базу при каждом старте. Операция идемпотентна: профиль с тем же slug
 * заменяется целиком в одной транзакции (каскадное удаление + вставка вложенными create),
 * поэтому после запуска «с нуля» и после перезапуска данные одинаковы.
 */
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap() {
    await this.seed(seedData);
    this.logger.log(`Профиль «${seedData.slug}» заполнен`);
  }

  async seed(d: SeedData) {
    const skills = d.skills.flatMap((g) => g.names.map((name) => ({ name, category: g.category })));
    await this.prisma.$transaction([
      this.prisma.profile.deleteMany({ where: { slug: d.slug } }),
      this.prisma.profile.create({
        data: {
          slug: d.slug,
          name: d.name,
          title: d.title,
          description: d.description,
          links: { create: d.links.map((l, position) => ({ ...l, position })) },
          skills: { create: skills.map((s, position) => ({ ...s, position })) },
          experiences: {
            create: d.experience.map((e) => ({
              company: e.company,
              position: e.position,
              startDate: toDate(e.start),
              endDate: e.end ? toDate(e.end) : null,
              achievements: { create: e.achievements.map((text, position) => ({ text, position })) },
            })),
          },
          projects: { create: d.projects.map((p, position) => ({ ...p, position })) },
        },
      }),
    ]);
  }
}
