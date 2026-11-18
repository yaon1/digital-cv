import DataLoader from 'dataloader';
import { Achievement, Experience, Link, Project, Skill } from '@prisma/client';
import { ProfileService } from './profile.service';

/**
 * Набор DataLoader'ов на ОДИН GraphQL-запрос (создаётся в контексте, см. app.module.ts).
 * Все обращения к связям за тик событийного цикла склеиваются в один запрос
 * `WHERE parentId IN (...)`, поэтому число SQL-запросов зависит от глубины запроса,
 * а не от количества записей (нет проблемы N+1).
 */
export interface Loaders {
  links: DataLoader<number, Link[]>;
  skills: DataLoader<number, Skill[]>;
  experiences: DataLoader<number, Experience[]>;
  projects: DataLoader<number, Project[]>;
  achievements: DataLoader<number, Achievement[]>;
}

export function createLoaders(service: ProfileService): Loaders {
  return {
    links: new DataLoader((ids) => service.linksFor(ids)),
    skills: new DataLoader((ids) => service.skillsFor(ids)),
    experiences: new DataLoader((ids) => service.experiencesFor(ids)),
    projects: new DataLoader((ids) => service.projectsFor(ids)),
    achievements: new DataLoader((ids) => service.achievementsFor(ids)),
  };
}
