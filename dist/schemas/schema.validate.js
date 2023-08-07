"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create a validation middleware
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // const { error } = schema.validateAsync(req.body);
    // const validateAsync = schema.validateAsync;
    try {
        yield schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        // console.log(err?.details?.[0]?.message,err)
        err.message = (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : err === null || err === void 0 ? void 0 : err.message;
        return next(err);
    }
    // if (error) {
    //   // Handle validation error
    //   // return  res.status(400).json({ error: error.details[0].message });
    // }
    // If validation is successful, proceed to the next middleware
});
exports.default = validate;
//# sourceMappingURL=schema.validate.js.map