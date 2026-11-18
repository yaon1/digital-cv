import { Injectable, NotFoundException } from '@nestjs/common';
import { Achievement, Experience, Link, Profile, Project, Skill } from '@prisma/client';
import { ProfileRepository } from './profile.repository';

/** Раскладывает плоский список по ключу, сохраняя порядок: результат для DataLoader. */
export function groupByKey<T>(keys: readonly number[], rows: T[], keyOf: (row: T) => number): T[][] {
  const map = new Map<number, T[]>(keys.map((k) => [k, []]));
  for (const row of rows) map.get(keyOf(row))?.push(row);
  return keys.map((k) => map.get(k) ?? []);
}

const pad = (n: number) => String(n).padStart(2, '0');
const month = (d: Date) => `${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;

/** Бизнес-логика: что считается профилем по умолчанию, как выглядит период работы. Про GraphQL и SQL не знает. */
@Injectable()
export class ProfileService {
  constructor(private readonly repo: ProfileRepository) {}

  async getProfile(slug?: string): Promise<Profile> {
    const profile = slug ? await this.repo.findBySlug(slug) : await this.repo.findMain();
    if (!profile) throw new NotFoundException(slug ? `Профиль «${slug}» не найден` : 'Профиль ещё не создан');
    return profile;
  }

  listProfiles(): Promise<Profile[]> {
    return this.repo.findAll();
  }

  formatPeriod(exp: Pick<Experience, 'startDate' | 'endDate'>): string {
    return `${month(exp.startDate)} — ${exp.endDate ? month(exp.endDate) : 'н.в.'}`;
  }

  async linksFor(ids: readonly number[]): Promise<Link[][]> {
    return groupByKey(ids, await this.repo.linksByProfileIds([...ids]), (r) => r.profileId);
  }

  async skillsFor(ids: readonly number[]): Promise<Skill[][]> {
    return groupByKey(ids, await this.repo.skillsByProfileIds([...ids]), (r) => r.profileId);
  }

  async experiencesFor(ids: readonly number[]): Promise<Experience[][]> {
    return groupByKey(ids, await this.repo.experiencesByProfileIds([...ids]), (r) => r.profileId);
  }

  async projectsFor(ids: readonly number[]): Promise<Project[][]> {
    return groupByKey(ids, await this.repo.projectsByProfileIds([...ids]), (r) => r.profileId);
  }

  async achievementsFor(ids: readonly number[]): Promise<Achievement[][]> {
    return groupByKey(ids, await this.repo.achievementsByExperienceIds([...ids]), (r) => r.experienceId);
  }
}
