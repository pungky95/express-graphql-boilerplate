import * as jwt from "jsonwebtoken";

export const verifyToken = (jwtToken: string) => {
    if (jwtToken) {
        const token = jwtToken.replace('Bearer ','');
        const jwtVerification = <any>jwt.verify(token, <jwt.Secret>process.env.JWT_SECRET);
        if (jwtVerification.user) {
            return jwtVerification.user;
        }
    }
    return null;
}