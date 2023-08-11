"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('module-alias/register');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const Credential_1 = __importDefault(require("./middleware/Credential"));
const corsOptions_1 = __importDefault(require("./middleware/corsOptions"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(Credential_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
app.use('/api/users', user_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Devlixer api's!",
    });
});
app.get('/api/healthChecker', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Devlixer!',
    });
});
app.all('*', (req, res, next) => {
    const err = new Error(`Routes ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
app.use((err, res) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
const port = config_1.default.app.port || 4000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map