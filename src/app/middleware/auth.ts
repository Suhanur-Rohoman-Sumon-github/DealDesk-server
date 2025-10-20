import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppEroor';


const Auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

   

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized access detected'
      );
    }

    // Extract the token by removing "Bearer "
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized access detected'
      );
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, config.access_secret_key as string) as JwtPayload;
    } catch (err) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized access detected'
      );
    }

    if (!decoded) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized access detected'
      );
    }

    // Check if user role is allowed
    // if (requiredRoles.length && !requiredRoles.includes(decoded.role as TUserRol)) {
    //   return res.status(httpStatus.UNAUTHORIZED).json({
    //     success: false,
    //     statusCode: httpStatus.UNAUTHORIZED,
    //     message: 'You have no access to this route',
    //   });
    // }


    next();
  });
};

export default Auth;
