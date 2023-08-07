import { Request, Response, NextFunction } from "express";

// Create a validation middleware
const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    // const { error } = schema.validateAsync(req.body);
    // const validateAsync = schema.validateAsync;
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err: any) {
      // console.log(err?.details?.[0]?.message,err)
      err.message =  err?.details?.[0]?.message ?? err?.message;
      return next(err);
    }

    // if (error) {
    //   // Handle validation error
    //   // return  res.status(400).json({ error: error.details[0].message });
    // }
    // If validation is successful, proceed to the next middleware
  };

export default validate;
