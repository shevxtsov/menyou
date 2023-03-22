import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'menyou',
    password: '123',
    database: 'menyou',
    entities: [__dirname + '/**/*.entity{.ts, .js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts, .js}']
}

export default config
