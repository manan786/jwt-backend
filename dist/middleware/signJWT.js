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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const signJWT = (payload, key, options = {}) => {
    var _a;
    const privateKey = Buffer.from((_a = config_1.default.auth) === null || _a === void 0 ? void 0 : _a[key], "base64").toString("ascii");
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, options), { algorithm: "RS256" }));
};
exports.signJWT = signJWT;
const verifyJWT = (token, key) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const publicKey = Buffer.from((_a = config_1.default.auth) === null || _a === void 0 ? void 0 : _a[key], "base64").toString("ascii");
        // console.log("publicKey", publicKey);
        return yield jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (e) {
        console.log(e);
        return null;
        // throw new Error("Invalid Token!");
    }
});
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=signJWT.js.map