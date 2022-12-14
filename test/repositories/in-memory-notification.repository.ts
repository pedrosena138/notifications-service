import { Notification } from 'src/app/entities/notification/notification.entity';
import { NotificationRepository } from 'src/app/repositories/notification.repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
