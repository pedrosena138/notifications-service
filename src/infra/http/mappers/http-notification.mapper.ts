import { Notification } from '@app/entities/notification/notification.entity';

export class HttpNotificationMapper {
  static map(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
    };
  }
}
