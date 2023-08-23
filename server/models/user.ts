import sequelize from '../db.js'
import BaseService from './base.js'
import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

export interface Participant {
	fio: string
	email: string
	age: number
	phone: string
	education: string
	school: string
}

class User extends Model<InferAttributes<User, { omit: 'id' }>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare type: string
	declare case: string
	declare teamTitle?: string | null
	declare specialization?: string | null
	declare membersAmount: number
	declare participants: Participant[]
	declare referrer?: string | null
}

export type IUser = InferAttributes<User, { omit: 'id' }>

User.init({
	type: {
		type: DataTypes.STRING(40),
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Тип участия является обязательным полем для заполнения'
			}
		},
		defaultValue: 'single'
	},
	case: {
		type: DataTypes.STRING(40),
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Кейс является обязательным полем для заполнения'
			}
		},
	},
	teamTitle: {
		type: DataTypes.STRING(255)
	},
	specialization: {
		type: DataTypes.STRING(255)
	},
	membersAmount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Количество участников является обязательным полем для заполнения'
			}
		},
		defaultValue: 1
	},
	participants: {
		type: DataTypes.JSON,
		allowNull: false
	},
	referrer: {
		type: DataTypes.STRING(60)
	}
}, {
		sequelize,
		modelName: 'User'
})

export default User

class UserService extends BaseService<User, IUser> {
	constructor() {
		super()
		this.model = User
	}
}

export const userService = new UserService()
