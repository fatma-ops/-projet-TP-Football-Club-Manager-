import jwt from 'jsonwebtoken';


const createToken = async (
  tokenData: any,
  tokenKey: string = process.env.TOKEN_SECRET!,
  expiresIn: string = process.env.TOKEN_EXPIRY!
)=> {
  try {
    const token = await jwt.sign(tokenData, tokenKey, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export default createToken;
