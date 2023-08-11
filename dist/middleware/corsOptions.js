"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalVal_1 = require("../utils/globalVal");
const corsOptions = {
    origin: (origin = '', callback = () => { }) => {
        if (globalVal_1.allowedOrigins.indexOf(origin !== null && origin !== void 0 ? origin : '') !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
//# sourceMappingURL=corsOptions.js.map