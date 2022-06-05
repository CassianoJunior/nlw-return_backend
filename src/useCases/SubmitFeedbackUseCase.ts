import { MailAdapter } from '../adapters/MailAdapter';
import { FeedbacksRepository } from '../repositories/FeedbacksRepository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    if (!type) throw new Error('Feedback type is required');

    if (!comment) throw new Error('Feedback comment is required');

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div styles="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Novo feedback ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`,
      ].join('\n'),
    });
  }
}
