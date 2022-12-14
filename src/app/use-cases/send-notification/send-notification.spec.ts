import { SendNotification } from './send-notification';
import { randomUUID } from 'node:crypto';

describe('Send notification use case', () => {
  const makeSUT = () => {
    const sut = new SendNotification();
    return { sut };
  };

  it('should be able to send a notification', async () => {
    const { sut } = makeSUT();

    const { notification } = await sut.execute({
      recipientId: randomUUID(),
      content: 'Você tem uma nova notificação',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
