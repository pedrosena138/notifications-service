import { Module } from '@nestjs/common';

import { NotificationsController } from './infra/controllers/notifications/notifications.controller';
import { PrismaService } from './infra/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [PrismaService],
})
export class AppModule {}
