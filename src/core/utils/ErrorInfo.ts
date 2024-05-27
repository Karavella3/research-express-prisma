interface IErrorInfo {
  status: number;
  error: string;
  details: object | null;
}

export class ErrorInfo implements IErrorInfo {
  constructor(errorInfo?: Partial<IErrorInfo>) {
    Object.assign(this, errorInfo);
  }

  status: number = 500;
  error: string = 'Internal Server Error';
  details: object | null = null;
}
