import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from './create-notification-body';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../services/prisma/prisma.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
