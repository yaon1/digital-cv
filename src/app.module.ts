import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from './prisma/prisma.module';
import { createLoaders } from './profile/profile.loaders';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProfileModule,
    SeedModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ProfileModule],
      inject: [ProfileService],
      useFactory: (profileService: ProfileService) => ({
        autoSchemaFile: true, // code-first, схема строится в памяти (файл schema.gql не нужен)
        sortSchema: true,
        path: '/graphql',
        playground: false, // свой GraphQL Playground отключён: вместо него Apollo Sandbox
        introspection: true, // Apollo Sandbox читает схему через интроспекцию
        // Встроенный Apollo Sandbox открывается по GET /graphql в браузере (в том числе в production)
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: false })],
        // Новые DataLoader'ы на каждый запрос: кэш не протекает между клиентами
        context: () => ({ loaders: createLoaders(profileService) }),
      }),
    }),
  ],
})
export class AppModule {}
