import express from 'express';
import {ApolloServer, ApolloServerExpressConfig} from 'apollo-server-express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import {buildSchema} from 'type-graphql';
import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';
import {Parsed} from 'dotenv-parse-variables';
import userResolver from './resolvers/user/userResolver';
import {createConnection} from 'typeorm';
import {verifyToken} from "./authorization/verifyToken";
import {getConnection} from "typeorm";



const main = async () => {
    const env = dotenv.config({});
    if (env.error) throw env.error;
    dotenvParseVariables((env.parsed as Parsed), {overrideProcessEnv: true});

    const schema = await buildSchema({
        resolvers: [userResolver],
        emitSchemaFile: true
    });

    const app = express();
    app.use(bodyParser.json());

    await createConnection({
        name:"default",
        type: "mysql",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
            __dirname + "/entity/*.js"
        ],
        synchronize: true,
        logging: false
    });

    const connection = getConnection();

    const server = new ApolloServer(({
        schema,
        context:({req}) => {
            const token = req.headers.authorization;
            const user = verifyToken(token as string);
            return {user,connection};
        }
    } as ApolloServerExpressConfig));

    server.applyMiddleware({app});
    app.listen(process.env.PORT, () => {
        console.log(`🚀 server is listen on port ${process.env.PORT}`);
    });
}

main().catch(err => console.error(err));