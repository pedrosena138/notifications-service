import { Content } from '@app/entities/notification/content';
import { Notification } from '@app/entities/notification/notification.entity';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(data: PrismaNotification): Notification {
    const notification = new Notification(
      {
        recipientId: data.recipientId,
        content: new Content(data.content),
        category: data.category,
        readAt: data.readAt,
        canceledAt: data.canceledAt,
        createdAt: data.createdAt,
      },
      data.id,
    );

    return notification;
  }
}
