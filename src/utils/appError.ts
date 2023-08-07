// class ErrorHandler extends Error {
//   constructor(public statusCode: number, message: string) {
//     super();
//     this.statusCode = statusCode;
//     this.message = message;
//   }
// }

// module.exports = ErrorHandler;
export default class AppError extends Error {
  status: string;
  isOperational: boolean;

  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
