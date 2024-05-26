import { ErrorInfo } from './ErrorInfo';

export class NotFoundError extends ErrorInfo {
  constructor(errorInfo?: Pick<ErrorInfo, 'details'>) {
    super({ status: 404, error: 'Not Found', details: errorInfo?.details });
  }
}
