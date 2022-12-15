import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { NotificationNotFound } from '@app/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unread notification use case', () => {
  const makeSUT = () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new UnreadNotification(notificationRepository);

    return { sut, notificationRepository };
  };

  it('should be able to unread a notification', async () => {
    const { sut, notificationRepository } = makeSUT();

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);
    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that not exists', async () => {
    const { sut } = makeSUT();

    const result = () => {
      return sut.execute({
        notificationId: randomUUID(),
      });
    };
    expect(result).rejects.toThrowError(NotificationNotFound);
  });
});
