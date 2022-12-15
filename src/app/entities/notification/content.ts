import { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH } from '@utils/constants';

export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return (
      content.length >= MIN_CONTENT_LENGTH &&
      content.length <= MAX_CONTENT_LENGTH
    );
  }
  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length not valid');
    }

    this.content = content;
  }
}
