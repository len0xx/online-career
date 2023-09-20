import sequelize from '../db.js'
import BaseService from './base.js'
import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional
} from 'sequelize'

class Participant extends Model<
    InferAttributes<Participant, { omit: 'id' }>,
    InferCreationAttributes<Participant>
> {
    declare id: CreationOptional<number>
    declare fio: string
    declare email: string
    declare age: number
    declare phone: string
    declare education: string
    declare school: string
}

export type IParticipant = InferAttributes<Participant, { omit: 'id' }>

Participant.init(
    {
        fio: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'ФИО является обязательным полем для заполнения'
                }
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Проверьте корректность заполнения поля Email'
                },
                notNull: {
                    msg: 'Email является обязательным полем для заполнения'
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Проверьте корректность заполнения поля возраст'
                },
                notNull: {
                    msg: 'Возраст является обязательным полем для заполнения'
                }
            }
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Номер телефона является обязательным полем для заполнения'
                }
            }
        },
        education: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Тип учебного заведения является обязательным полем для заполнения'
                }
            },
            defaultValue: 1
        },
        school: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Учебное заведение является обязательным полем для заполнения'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Participant'
    }
)

export default Participant

class ParticipantService extends BaseService<Participant, IParticipant> {
    constructor() {
        super()
        this.model = Participant
    }
}

export const participantService = new ParticipantService()
