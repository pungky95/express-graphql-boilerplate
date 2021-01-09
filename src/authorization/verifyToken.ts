import * as jwt from "jsonwebtoken";

export const verifyToken = (jwtToken: string) => {
    if (jwtToken) {
        const token = jwtToken.replace('Bearer ','');
        const jwtVerification = (jwt.verify(token, (process.env.JWT_SECRET as jwt.Secret)) as any);
        if (jwtVerification.user) {
            return jwtVerification.user;
        }
    }
    return null;
}