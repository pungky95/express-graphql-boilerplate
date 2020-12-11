import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';
import {Parsed} from 'dotenv-parse-variables';
import userResolver from "./resolvers/userResolver";


const main = async () => {
    let env = dotenv.config({});
    if (env.error) throw env.error;
    dotenvParseVariables(<Parsed>env.parsed, {overrideProcessEnv: true});

    const schema = await buildSchema({
        resolvers: [userResolver],
        emitSchemaFile: true
    });

    const app = express();
    app.use(bodyParser.json());
    const server = new ApolloServer({
        schema
    });

    server.applyMiddleware({ app });
    app.listen(process.env.PORT, () => {
        console.log(`🚀 server is listen on port ${process.env.PORT}`);
    });
}

main().catch(err => console.error(err));