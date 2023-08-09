import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { allowedRoles } from '@utils/globalVal';

const prisma = new PrismaClient();

const checkEmailUniqueness = async (email: string) => {
    const users = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (users) {
        const error = new Error('Email already exists') as any;
        error.statusCode = 409;
        throw error;
    }
};

// Define the Joi schema with type annotations
export const createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required().external(checkEmailUniqueness),
    password: Joi.string().min(6).required(),
    role: Joi.string()
        .valid(...allowedRoles)
        .messages({
            'any.only': "User role isn't valid!",
        }),
    confirmpassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .strict(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
