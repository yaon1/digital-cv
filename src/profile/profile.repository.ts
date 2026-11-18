import { Injectable } from '@nestjs/common';
import { Achievement, Experience, Link, Profile, Project, Skill } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Единственное место, которое знает про Prisma-запросы профиля.
 * Методы *ByProfileIds / *ByExperienceIds принимают список id и делают ОДИН запрос,
 * на них опираются DataLoader'ы (см. profile.loaders.ts).
 */
@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findBySlug(slug: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: { slug } });
  }

  findMain(): Promise<Profile | null> {
    return this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({ orderBy: { id: 'asc' } });
  }

  linksByProfileIds(ids: number[]): Promise<Link[]> {
    return this.prisma.link.findMany({ where: { profileId: { in: ids } }, orderBy: { position: 'asc' } });
  }

  skillsByProfileIds(ids: number[]): Promise<Skill[]> {
    return this.prisma.skill.findMany({ where: { profileId: { in: ids } }, orderBy: { position: 'asc' } });
  }

  experiencesByProfileIds(ids: number[]): Promise<Experience[]> {
    return this.prisma.experience.findMany({ where: { profileId: { in: ids } }, orderBy: { startDate: 'desc' } });
  }

  projectsByProfileIds(ids: number[]): Promise<Project[]> {
    return this.prisma.project.findMany({ where: { profileId: { in: ids } }, orderBy: { position: 'asc' } });
  }

  achievementsByExperienceIds(ids: number[]): Promise<Achievement[]> {
    return this.prisma.achievement.findMany({ where: { experienceId: { in: ids } }, orderBy: { position: 'asc' } });
  }
}
