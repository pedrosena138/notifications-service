import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { SendNotificationBody } from '../dtos/send-notification-body';
import { SendNotification } from '@app/use-cases/send-notification/send-notification';
import { HttpNotificationMapper } from '../mappers/http-notification.mapper';
import { CancelNotification } from '@app/use-cases/cancel-notification/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notification/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification/unread-notification';
import { GetRecipientNotifications } from '../../../app/use-cases/get-recipient-notifications/get-recipient-notifications';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications/count-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Get('recipient/:recipientId')
  async findManyByRecipientId(@Param('recipientId') recipientId: string) {
    if (!recipientId) {
      throw new BadRequestException('Param recipientId is required');
    }

    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(HttpNotificationMapper.toHttp) };
  }

  @Post()
  async send(@Body() body: SendNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: HttpNotificationMapper.toHttp(notification) };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Param id is required');
    }
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Param id is required');
    }
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Param id is required');
    }
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Get('recipient/:recipientId/count')
  async countByRecipientId(@Param('recipientId') recipientId: string) {
    if (!recipientId) {
      throw new BadRequestException('Param recipientId is required');
    }

    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }
}
