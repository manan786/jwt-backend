import { allowedOrigins } from '../utils/globalVal';

export default {
    // const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // credentials: false,
    optionsSuccessStatus: 200,
};
