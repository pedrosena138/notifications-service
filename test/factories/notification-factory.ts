import {
  Notification,
  NotificationProps,
} from '@app/entities/notification/notification.entity';
import { Content } from '@app/entities/notification/content';
import { randomUUID } from 'node:crypto';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: randomUUID(),
    content: new Content('notificação teste'),
    category: 'social',
    ...override,
  });
}
