import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 *
 * @param aadharCardNumber patient aadharCard number
 * @returns new jwt token
 */
export function jwtTokenGenerator(aadharCardNumber: string) {
  return jwt.sign({ aadharCardNumber }, process.env.JWT_KEY!);
}
