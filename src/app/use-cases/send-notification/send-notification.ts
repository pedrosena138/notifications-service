import { NotificationRepository } from '../../repositories/notification.repository';
import { Content } from '../../entities/notification/content';
import { Notification } from '../../entities/notification/notification.entity';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category } = request;
    const content = new Content(request.content);

    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    await this.notificationRepository.create(notification);
    return { notification };
  }
}
