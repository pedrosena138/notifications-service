import { Injectable } from '@nestjs/common';
import { Notification } from 'src/app/entities/notification/notification.entity';
import { NotificationRepository } from '../../../../app/repositories/notification.repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const queryResult = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!queryResult) {
      return null;
    }

    const notification = PrismaNotificationMapper.toDomain(queryResult);

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const queryResult = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    const notifications = queryResult.map(PrismaNotificationMapper.toDomain);

    return notifications;
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({ data });
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({ where: { id: data.id }, data });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }
}
