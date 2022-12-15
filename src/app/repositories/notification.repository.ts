import { Notification } from '../entities/notification/notification.entity';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
}
