import { Notification } from '@app/entities/notification/notification.entity';

export class PrismaNotificationMapper {
  static map(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
