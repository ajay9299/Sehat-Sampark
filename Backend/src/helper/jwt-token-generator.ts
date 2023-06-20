import jwt from "jsonwebtoken";
export function jwtTokenGenerator(aadharCardNumber: string) {
  return jwt.sign({ aadharCardNumber }, "sdfbsfbshbehsebr");
}
