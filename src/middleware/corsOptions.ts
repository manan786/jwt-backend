import { allowedOrigins } from '@utils/globalVal';

type Origin = string | null;

type CorsCallback = (error: Error | null, allowed: boolean) => void;

const corsOptions = {
    origin: (origin: Origin = '', callback: CorsCallback = () => {}) => {
        // have to remove !origin before going to production
        if (allowedOrigins.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200,
};

export default corsOptions;
