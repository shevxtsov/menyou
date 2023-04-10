import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    username: process.env.PGUSER,
    password: String(process.env.PGPASSWORD),
    database: process.env.PGDATABASE,
    entities: [__dirname + '/**/*.entity.js'],
    synchronize: true,
    migrations: [__dirname + '/migrations/**/*{.ts, .js}']
}

export default config
