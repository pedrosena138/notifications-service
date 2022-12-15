import { NotificationRepository } from '../../repositories/notification.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
