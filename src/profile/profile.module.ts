import { Module } from '@nestjs/common';
import { ExperienceResolver, ProfileResolver } from './profile.resolver';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileRepository, ProfileService, ProfileResolver, ExperienceResolver],
  exports: [ProfileService],
})
export class ProfileModule {}
