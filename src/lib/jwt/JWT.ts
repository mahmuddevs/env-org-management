import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

interface TokenPayload {
    email: string;
}

interface DecodedToken extends JwtPayload {
    email: string;
}

const generateToken = (email: string): string => {
    const payload: TokenPayload = { email };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string | undefined) => {
    if (!token) {
        return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken

    if (!decoded) {
        return
    }

    return decoded.email
}

export default generateToken;