import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com',
    port: 5432,
    username: 'menyou-main-db-0a6f902cce65848ac',
    password: 'YkA9sWZS53eaAE7PD4B6gX9z645FCP',
    database: 'menyou-main-db-0a6f902cce65848ac',
    entities: [__dirname + '/**/*.entity.js'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts, .js}']
}

export default config
