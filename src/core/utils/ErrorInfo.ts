interface IErrorInfo {
  status: number;
  error: string;
  details: object | null;
}

export class ErrorInfo implements IErrorInfo {
  constructor(errorInfo?: Partial<IErrorInfo>) {
    Object.assign(this, errorInfo);
  }

  status = 500;
  error = 'Internal Server Error';
  details = null;
}
