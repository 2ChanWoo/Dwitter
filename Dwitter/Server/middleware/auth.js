import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth_repository.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  // TODO: Make it secure!
  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);  //! 왜 me에서 Authorization을 헤더에 직접 설정하면 여기에 걸리는지.. 폴더에 설정하면 동작함..ㅠ
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id; // req.customData
      next();
    }
  );
};
