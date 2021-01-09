import {User} from "../entity/User";
import * as jwt from "jsonwebtoken"

export const generateToken = (user:User) => {
    const jwtPayload = {
        user
    };
    const jwtToken = jwt.sign(jwtPayload, (process.env.JWT_SECRET as jwt.Secret), {
        expiresIn: `${process.env.JWT_EXPIRED_IN_DAY} days`
    });
    const jwtVerification = (jwt.verify(jwtToken,(process.env.JWT_SECRET as jwt.Secret)) as any);
    const {iat:issuedTime,exp:expiredTime} = jwtVerification;
    const token = `Bearer ${jwtToken}`;
    return {
        token,
        issuedTime,
        expiredTime
    }
}