import {User} from "../entity/User";
import * as jwt from "jsonwebtoken"

export const generateToken = (user:User) => {
    const jwtPayload = {
        user
    };
    const jwtToken = jwt.sign(jwtPayload, <jwt.Secret>process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRED_IN_DAY} days`
    });
    const jwtVerification = <any>jwt.verify(jwtToken,<jwt.Secret>process.env.JWT_SECRET);
    const {iat:issuedTime,exp:expiredTime} = jwtVerification;
    const token = `Bearer ${jwtToken}`;
    return {
        token,
        issuedTime,
        expiredTime
    }
}