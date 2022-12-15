import { NotificationRepository } from '../../repositories/notification.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
