import { Injectable } from '@nestjs/common';
import { Notification } from 'src/app/entities/notification/notification.entity';
import { NotificationRepository } from '../../../../app/repositories/notification.repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.map(notification);
    await this.prismaService.notification.create({ data });
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
