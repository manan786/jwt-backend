"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeSensitiveFields = void 0;
const excludeSensitiveFields = (obj, excludeFields) => {
    if (!obj || !excludeFields || excludeFields.length === 0) {
        return null;
    }
    const filteredObj = Object.assign({}, obj);
    for (const field of excludeFields) {
        delete filteredObj[field];
    }
    return filteredObj;
};
exports.excludeSensitiveFields = excludeSensitiveFields;
//# sourceMappingURL=helperFunction.js.map