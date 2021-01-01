import {User} from "../entity/User";
import {Connection} from "typeorm";

export type ContextType = {
    user:User
    connection:Connection
};