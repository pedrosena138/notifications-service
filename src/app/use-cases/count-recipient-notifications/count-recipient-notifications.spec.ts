import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications use case', () => {
  const makeSUT = () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new CountRecipientNotifications(notificationRepository);

    return { sut, notificationRepository };
  };

  it('should be able to count a recipient notifications', async () => {
    const { sut, notificationRepository } = makeSUT();
    const recipientId = randomUUID();

    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(
      makeNotification({ recipientId: randomUUID() }),
    );

    const { count } = await sut.execute({ recipientId });

    expect(count).toEqual(2);
  });
});
