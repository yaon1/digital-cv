import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL-типы (code-first). Поля-связи (links, skills, ...) объявлены в резолверах
 * через ResolveField: вложенные данные грузятся только если клиент их запросил,
 * и сразу пачкой через DataLoader.
 */
@ObjectType()
export class Link {
  @Field(() => ID) id: number;
  @Field() label: string;
  @Field() url: string;
}

@ObjectType()
export class Skill {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field({ description: 'Группа: Backend, Frontend, DevOps и т.д.' }) category: string;
}

@ObjectType()
export class Achievement {
  @Field(() => ID) id: number;
  @Field() text: string;
}

@ObjectType()
export class Project {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() url: string;
  @Field() description: string;
  @Field(() => [String]) technologies: string[];
}

@ObjectType()
export class Experience {
  @Field(() => ID) id: number;
  @Field() company: string;
  @Field() position: string;
  @Field(() => Date) startDate: Date;
  @Field(() => Date, { nullable: true, description: 'null — работа продолжается' }) endDate: Date | null;
}

@ObjectType()
export class Profile {
  @Field(() => ID) id: number;
  @Field() slug: string;
  @Field() name: string;
  @Field({ description: 'Должность одной строкой' }) title: string;
  @Field() description: string;
}
