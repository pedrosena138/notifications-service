import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import {
  MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGTH,
} from '../../../utils/constants';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId!: string;

  @IsNotEmpty()
  @Length(MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH)
  content!: string;

  @IsNotEmpty()
  category!: string;
}
