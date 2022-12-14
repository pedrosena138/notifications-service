import { SendNotification } from './send-notification';
import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '../../../../test/repositories/in-memory-notification.repository';

describe('Send notification use case', () => {
  const makeSUT = () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new SendNotification(notificationRepository);

    return { sut, notificationRepository };
  };

  it('should be able to send a notification', async () => {
    const { sut, notificationRepository } = makeSUT();

    const { notification } = await sut.execute({
      recipientId: randomUUID(),
      content: 'Você tem uma nova notificação',
      category: 'social',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
