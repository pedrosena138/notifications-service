import { CancelNotification } from './cancel-notification';
import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { Notification } from '@app/entities/notification/notification.entity';
import { Content } from '@app/entities/notification/content';
import { NotificationNotFound } from '@app/errors/notification-not-found';

describe('Cancel notification use case', () => {
  const makeSUT = () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new CancelNotification(notificationRepository);

    return { sut, notificationRepository };
  };

  it('should be able to cancel a notification', async () => {
    const { sut, notificationRepository } = makeSUT();

    const notification = new Notification({
      recipientId: randomUUID(),
      content: new Content('notificação teste'),
      category: 'social',
    });

    await notificationRepository.create(notification);
    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to cancel a notification that not exists', async () => {
    const { sut } = makeSUT();

    const result = () => {
      return sut.execute({
        notificationId: randomUUID(),
      });
    };
    expect(result).rejects.toThrowError(NotificationNotFound);
  });
});
