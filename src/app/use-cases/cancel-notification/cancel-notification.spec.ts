import { CancelNotification } from './cancel-notification';
import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { makeNotification } from '@test/factories/notification-factory';
import { NotFoundException } from '@nestjs/common';

describe('Cancel notification use case', () => {
  const makeSUT = () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new CancelNotification(notificationRepository);

    return { sut, notificationRepository };
  };

  it('should be able to cancel a notification', async () => {
    const { sut, notificationRepository } = makeSUT();

    const notification = makeNotification();

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
    expect(result).rejects.toThrowError(NotFoundException);
  });
});
