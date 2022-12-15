import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { NotificationNotFound } from '@app/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Cancel notification use case', () => {
  const makeSUT = () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new ReadNotification(notificationRepository);

    return { sut, notificationRepository };
  };

  it('should be able to read a notification', async () => {
    const { sut, notificationRepository } = makeSUT();

    const notification = makeNotification();

    await notificationRepository.create(notification);
    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that not exists', async () => {
    const { sut } = makeSUT();

    const result = () => {
      return sut.execute({
        notificationId: randomUUID(),
      });
    };
    expect(result).rejects.toThrowError(NotificationNotFound);
  });
});
