import { Content } from '../../entities/notification/content';
import { Notification } from '../../entities/notification/notification.entity';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}
export class SendNotification {
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category } = request;
    const content = new Content(request.content);

    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
