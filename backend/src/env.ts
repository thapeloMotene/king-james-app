import { cleanEnv, host, port, str, } from 'envalid';

const env = cleanEnv(process.env, {
    MONGO_DB_URL: host({default:'mongodb://127.0.0.1:27017/kj-be-db-dev1'}),
    GRIDFS_MONGO_DB_URL: host({default:'mongodb://127.0.0.1:27017/kj-be-db-dev1'}),
    PORT: port({ default: 8080 }),
    NODE_ENV: str({ default:'development'}),
    SECRET_KEY: str({ default:'N0t_S0_S3cR3T'})
});

export default env;
