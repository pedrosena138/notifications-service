import { Module } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
