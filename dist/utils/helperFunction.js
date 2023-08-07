"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeSensitiveFields = void 0;
const excludeSensitiveFields = (obj, excludeFields) => {
    if (!obj || !excludeFields || excludeFields.length === 0) {
        return null;
    }
    // Create a new object to hold the filtered properties
    const filteredObj = Object.assign({}, obj);
    // Remove the specified fields from the object
    for (const field of excludeFields) {
        delete filteredObj[field];
    }
    return filteredObj;
};
exports.excludeSensitiveFields = excludeSensitiveFields;
//# sourceMappingURL=helperFunction.js.map