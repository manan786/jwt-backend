import { Request, Response, NextFunction } from 'express';
// Create a validation middleware
const validate =
    (schema: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        // const { error } = schema.validateAsync(req.body);
        // const validateAsync = schema.validateAsync;
        try {
            await schema.validateAsync(req.body);
            return next();
        } catch (err: any) {
            // console.log(err?.details?.[0]?.message,err)
            const message = err?.details?.[0]?.message ?? err?.message;

            return res.status(400).json({ error: message });

            // return next(err);
            // return next(new AppError(err));
        }

        // if (error) {
        //   // Handle validation error
        //   // return  res.status(400).json({ error: error.details[0].message });
        // }
        // If validation is successful, proceed to the next middleware
    };

export default validate;
