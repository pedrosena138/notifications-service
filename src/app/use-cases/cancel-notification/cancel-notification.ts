import { NotificationRepository } from '../../repositories/notification.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
