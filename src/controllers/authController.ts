import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, city, address, companyName, photo } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      city,
      address,
      companyName,
      photo,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        city: user.city,
        address: user.address,
        companyName: user.companyName,
        photo: user.photo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        city: user.city,
        address: user.address,
        companyName: user.companyName,
        photo: user.photo,
      },
    });
  } catch (error) {
    next(error);
  }
};

const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as {
      userId: string;
    };

    // Validate token with user in DB
    const user = await UserModel.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      res.status(403).json({ message: 'Invalid refresh token' });
      return;
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id.toString());

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: 'Refresh token expired or invalid' });
  }
};
