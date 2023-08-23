import { Sequelize, type Options } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env
const dev = NODE_ENV == 'development'

interface ConnectionConfig {
    database: string,
    user: string,
    password: string,
    options: Options
}

const CONFIG: ConnectionConfig = {
    database: dev ? 'sber' : DB_NAME,
    user: dev ? 'postgres' : DB_USER,
    password: dev ? 'postgresroot' : DB_PASSWORD,
    options: {
        host: dev ? 'localhost' : DB_HOST,
        dialect: 'postgres',
        logging: dev ? console.log : false,
        hooks: {
            beforeDefine: (_, model) => {
                const prefix = dev ? 'dev_' : ''
                model.tableName = prefix + model.name.plural
            }
        }
    }
}

const db = new Sequelize(
    CONFIG.database,
    CONFIG.user,
    CONFIG.password,
    CONFIG.options
)

export default db

export const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync({ alter: dev })
        console.log('DB connected successfully')
    }
    catch (e) {
        console.error('DB connection failed')
        console.error(e)
        process.exit(1)
    }
}

