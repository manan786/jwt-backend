require('dotenv').config();
require('module-alias/register');
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// import morgan from "morgan";
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import credentials from './middleware/Credential';
import corsOptions from './middleware/corsOptions';
import config from './config/config';
// import {connectRedis} from "./utils/connectRedis";
const app = express();
// Use helmet middleware to set security headers (reduce the risk of various common attacks)
// helmet provides a strong layer of security
app.use(helmet());

// add 'Access-Control-Allow-Credentials' in req header
// is an HTTP header that allows or denies the sharing of cookies, HTTP authentication
// When this header is set to true, it indicates that the server is willing to accept credentials (like cookies or HTTP authentication) in the cross-origin request
app.use(credentials);

//  middleware allows you to define which origins are allowed to access your server's resources
app.use(cors(corsOptions));

// middleware to parse incoming JSON data from HTTP requests
// This is a security measure to prevent potential denial-of-service (DoS) attacks
app.use(express.json({ limit: '10kb' })); // you are restricting the size of the incoming JSON data to 10 kilobytes

// middleware used to parse HTTP request cookies and make them available on the req.cookies object.
app.use(cookieParser());

// 4. Logger
// if (process.env.NODE_ENV === "development") app.use(morgan("dev")); //sdds sd

// 5. Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// 5. Testing
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Devlixer api's!",
    });
});
app.get('/api/healthChecker', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Devlixer!',
    });
});
// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Routes ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
app.use((err: any, res: Response) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    // console.log('err', err);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

const port = config.app.port || 4000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
    // ? call the connectDB function here
    // connectDB();
    // connectRedis();
});
