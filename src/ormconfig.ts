import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'menyou',
    password: '123',
    database: 'menyou'
}

export default config
