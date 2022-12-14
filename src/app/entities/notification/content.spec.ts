import {
  MAX_CONTENT_LENGTH,
  MIN_CONTENT_LENGTH,
} from '../../../utils/constants';
import { Content } from './content';

describe('Notification content value object', () => {
  it('should be able to create notification content', () => {
    const content = new Content('Nova solicitação de amizade');
    expect(content).toBeTruthy();
  });

  it(`should not be able to create notification content with less than ${MIN_CONTENT_LENGTH} characters`, () => {
    const content = 'Lorem Ipsum'[MIN_CONTENT_LENGTH - 1];
    expect(() => new Content(content)).toThrow();
  });

  it(`should not be able to create notification content with more than ${MAX_CONTENT_LENGTH} characters`, () => {
    const content = 'a'.repeat(MAX_CONTENT_LENGTH + 1);
    expect(() => new Content(content)).toThrow();
  });
});
