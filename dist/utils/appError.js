"use strict";
// class ErrorHandler extends Error {
//   constructor(public statusCode: number, message: string) {
//     super();
//     this.statusCode = statusCode;
//     this.message = message;
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
// module.exports = ErrorHandler;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map