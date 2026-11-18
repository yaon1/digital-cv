import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile as ProfileRow, Experience as ExperienceRow } from '@prisma/client';
import { Loaders } from './profile.loaders';
import { Achievement, Experience, Link, Profile, Project, Skill } from './models';
import { ProfileService } from './profile.service';

interface Ctx {
  loaders: Loaders;
}

@Resolver(() => Profile)
export class ProfileResolver {
  @Query(() => Profile, { description: 'Профиль. Без аргумента — основной (первый) профиль' })
  profile(@Args('slug', { nullable: true }) slug?: string) {
    return this.service.getProfile(slug);
  }

  @Query(() => [Profile], { description: 'Все профили (в базе обычно один)' })
  profiles() {
    return this.service.listProfiles();
  }

  constructor(private readonly service: ProfileService) {}

  @ResolveField(() => [Link])
  links(@Parent() p: ProfileRow, @Context() ctx: Ctx) {
    return ctx.loaders.links.load(p.id);
  }

  @ResolveField(() => [Skill])
  async skills(
    @Parent() p: ProfileRow,
    @Context() ctx: Ctx,
    @Args('category', { nullable: true, description: 'Фильтр по группе навыков' }) category?: string,
  ) {
    const all = await ctx.loaders.skills.load(p.id);
    return category ? all.filter((s) => s.category === category) : all;
  }

  @ResolveField(() => [Experience], { description: 'Опыт работы, от новых мест к старым' })
  experience(@Parent() p: ProfileRow, @Context() ctx: Ctx) {
    return ctx.loaders.experiences.load(p.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() p: ProfileRow, @Context() ctx: Ctx) {
    return ctx.loaders.projects.load(p.id);
  }
}

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly service: ProfileService) {}

  @ResolveField(() => [Achievement])
  achievements(@Parent() e: ExperienceRow, @Context() ctx: Ctx) {
    return ctx.loaders.achievements.load(e.id);
  }

  @ResolveField(() => String, { description: 'Период в виде «03.2024 — 10.2026» или «02.2026 — н.в.»' })
  period(@Parent() e: ExperienceRow) {
    return this.service.formatPeriod(e);
  }
}
