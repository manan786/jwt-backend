"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalVal_1 = require("@utils/globalVal");
exports.default = {
    origin: (origin, callback) => {
        if (globalVal_1.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOptions.js.map