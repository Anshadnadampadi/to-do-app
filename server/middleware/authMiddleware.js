import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { isConnectedToMongo } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'winter_arc_super_secret_jwt_key_2025'
      );

      if (isConnectedToMongo) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        req.user = {
          _id: decoded.id || 'dev-user-id',
          name: decoded.name || 'Anshad',
          email: decoded.email || 'anshad@winterarc.dev'
        };
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed verification',
        error: error.message
      });
    }
  }

  // Optional dev fallback: if no token is sent during development, allow demo user
  if (process.env.NODE_ENV !== 'production') {
    req.user = {
      _id: 'dev-anshad-id',
      name: 'Anshad',
      email: 'anshad@winterarc.dev'
    };
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Not authorized, no token provided'
  });
};
