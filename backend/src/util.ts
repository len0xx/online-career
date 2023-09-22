import { createHash } from 'crypto'

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export type AllowedTypes = 'string' | 'number' | 'array' | 'object' | 'boolean' | 'bigint' | 'undefined' | 'symbol'
export const allowedTypes: AllowedTypes[] = [ 'string', 'number', 'boolean', 'bigint', 'undefined', 'object' ]

export interface ValidationRule<ValueType = any> {
    type?: AllowedTypes
    required?: boolean
    isNumeric?: boolean
    minLen?: number
    maxLen?: number
    minValue?: ValueType
    maxValue?: ValueType
    match?: ValueType | (() => ValueType) | RegExp
    dontMatch?: ValueType | (() => ValueType) | RegExp
    contains?: string | number | (string | number)[][]
    notContains?: string | number | (string | number)[][]
    isIn?: ValueType[]
    notIn?: ValueType[]
    customValidation?: (input: ValueType) => boolean
    errorText?: string
    alphaNum?: boolean
}

export type ValidationSchema<ValueType = any> = Record<string, ValidationRule<ValueType>>

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export interface ObjectHasLength extends Object {
    length: number
}

export const includesAny = (input: string, arr: string[]) => {
    let flag = false
    for (const char of arr) {
        if (input.includes(char)) {
            flag = true
            break
        }
    }
    return flag
}

export const validateSchema = <ValueType>(
    schema: ValidationSchema,
    data: Record<string, ValueType>
): boolean => {
    for (const key in schema) {
        const rule = schema[key]
        const val = data[key]
        const err = rule.errorText

        // The type of value must match the passed type
        if (rule.type) {
            if (allowedTypes.includes(rule.type)) {
                if (typeof val !== rule.type) {
                    throw new ValidationError(err || `Field ${ key } is expected to be of type '${ rule.type }', but its type is ${ typeof val }`)
                }
            }
            else if (rule.type === 'array' && !Array.isArray(val)) {
                throw new ValidationError(err || `Field ${ key } is expected to be of type 'array', but it is not an array`)
            }
        }

        // The value must be present in data variable and must not be nullish (false is an exception since it is a value of type boolean, not nullish)
        if (rule.required && !(typeof val === 'boolean' && val === false) && !val) {
            throw new ValidationError(err || `Field ${ key } is required by the provided schema, but value is "${ val }"`)
        }

        // The value must be either a numeric string or a number itself
        if (rule.isNumeric) {
            if (isNaN(+(val as number))) {
                throw new ValidationError(err || `Field ${ key } is expected to be numeric, but it's value is "${ val }"`)
            }
        }

        // The value must be greater than or equal to a passed parameter
        if (rule.minValue || typeof rule.minValue === 'number' && rule.minValue === 0) {
            if (val as number < rule.minValue) {
                throw new ValidationError(err || `Field ${ key } is expected to be greater than ${ rule.minValue }, but it's value is "${ val }"`)
            }
        }

        // The value must be less than or equal to a passed parameter
        if (rule.maxValue || typeof rule.maxValue === 'number' && rule.maxValue === 0) {
            if (val as number > rule.maxValue) {
                throw new ValidationError(err || `Field ${ key } is expected to be less than ${ rule.maxValue }, but it's value is "${ val }"`)
            }
        }

        // The value's length property must be greater than or equal to a passed parameter
        if (rule.minLen || rule.minLen === 0) {
            if (typeof (val as ObjectHasLength).length !== 'number') {
                throw new ValidationError(err || `Field ${ key } is expected to have at least ${ rule.minLen } elements in it, but it has no 'length' property`)
            }
            else if ((val as ObjectHasLength).length < rule.minLen) {
                throw new ValidationError(
                    err || `Field ${ key } is expected to have at least ${ rule.minLen } elements in it, but it has length of ${ (val as ObjectHasLength).length }`
                )
            }
        }

        // The value's length property must be less than or equal to a passed parameter
        if (rule.maxLen || rule.maxLen === 0) {
            if (typeof (val as ObjectHasLength).length !== 'number') {
                throw new ValidationError(err || `Field ${ key } is expected to have ${ rule.maxLen } elements at most in it, but it has no 'length' property`)
            }
            else if ((val as ObjectHasLength).length > rule.maxLen) {
                throw new ValidationError(
                    err || `Field ${ key } is expected to have ${ rule.maxLen } elements at most in it, but it has length of ${ (val as ObjectHasLength).length }`
                )
            }
        }

        // The value must match a passed parameter
        if (rule.match) {
            if (typeof rule.match === 'function') {
                if (rule.match() !== val) {
                    throw new ValidationError(err || `Field ${ key } did not match ${ rule.match }`)
                }
            }
            else if (rule.match instanceof RegExp) {
                if (!rule.match.test((val as Object).toString())) {
                    throw new ValidationError(err || `Field ${ key } did not match ${ rule.match }`)
                }
            }
            else if (rule.match !== val) {
                throw new ValidationError(err || `Field ${ key } did not match ${ rule.match }`)
            }
        }

        // The value must be anything other than a passed parameter
        if (rule.dontMatch) {
            if (typeof rule.dontMatch === 'function') {
                if (rule.dontMatch() === val) {
                    throw new ValidationError(err || `Field ${ key } should not match ${ rule.dontMatch }`)
                }
            }
            else if (rule.dontMatch instanceof RegExp) {
                if (rule.dontMatch.test((val as Object).toString())) {
                    throw new ValidationError(err || `Field ${ key } should not match ${ rule.dontMatch }`)
                }
            }
            else if (rule.dontMatch === val) {
                throw new ValidationError(err || `Field ${ key } should not match ${ rule.dontMatch }`)
            }
        }

        // contains: string | number => The value must contain a passed parameter
        // contains: (string | number)[][] => The value must contain at least one element from each array passed as a parameter
        if (rule.contains && val && (typeof val === 'string' || Array.isArray(val))) {
            if (typeof rule.contains === 'string' || typeof rule.contains === 'number') {
                if (!(typeof val === 'string' && val.includes(rule.contains.toString()))) {
                    throw new ValidationError(err || `Field ${ key } is expected to contain ${ rule.contains }, but it does not`)
                }
            }
            else {
                let failure: (string | number)[] = []
                let flag = true

                for (const collection of rule.contains) {
                    let localFlag = false
                    for (const item of collection.filter((v) => !!v)) {
                        if (val.includes(item.toString())) {
                            localFlag = true
                            break
                        }
                    }

                    if (!localFlag) {
                        failure = collection
                        flag = false
                        break
                    }
                }

                if (!flag) {
                    throw new ValidationError(
                        err || `Field ${ key } is expected to contain at least one value from the list: ${ failure.join(', ') }, but it does not`
                    )
                }
            }
        }

        // contains: string | number => The value should not contain a passed parameter
        // contains: (string | number)[][] => The value should not contain any element from each array passed as a parameter
        if (rule.notContains && val && (typeof val === 'string' || Array.isArray(val))) {
            if (typeof rule.notContains === 'string' || typeof rule.notContains === 'number') {
                if (typeof val === 'string' && val.includes(rule.notContains.toString())) {
                    throw new ValidationError(err || `Field ${ key } is expected not to contain ${ rule.notContains }, but it does`)
                }
            }
            else {
                let failure: (string | number)[] = []
                let flag = true

                for (const collection of rule.notContains) {
                    let localFlag = false
                    for (const item of collection.filter((v) => !!v)) {
                        if (!val.includes(item.toString())) {
                            localFlag = true
                            break
                        }
                    }

                    if (localFlag) {
                        failure = collection
                        flag = false
                        break
                    }
                }

                if (!flag) {
                    throw new ValidationError(
                        err || `Field ${ key } is expected not to contain any value from the list: ${ failure.join(', ') }, but it does`
                    )
                }
            }
        }

        // The value must be present in a passed parameter
        if (rule.isIn && val && !rule.isIn.includes(val)) {
            throw new ValidationError(err || `Field ${ key } does not match the permitted range of values`)
        }

        // The value must be absent in a passed parameter
        if (rule.notIn && val && rule.notIn.includes(val)) {
            throw new ValidationError(err || `Field ${ key } does not match the permitted range of values`)
        }

        // The custom function must return true
        if (rule.customValidation) {
            if (!rule.customValidation(val)) {
                throw new ValidationError(err || `Field ${ key } failed on custom validation`)
            }
        }

        // The value must only contain alpha-numeric characters
        if (rule.alphaNum && val && typeof val === 'string') {
            if (!/^[a-zA-Z0-9]*$/.test(val)) {
                throw new ValidationError(err || `Field ${ key } is expected to only contain alpha-numeric characters`)
            }
        }
    }
    return true
}

export const generateCode = (email: string) => {
    const time = +new Date()
    const random = Math.random() * 100
    return createHash('md5').update(`${time}.${email}.${random}`).digest('hex')
}

export type NOTISEND_ALLOWED_GROUPS = '425826' | '425874'
export const NOTISEND_WELCOME_GROUP: NOTISEND_ALLOWED_GROUPS = '425826'
export const NOTISEND_RESET_GROUP: NOTISEND_ALLOWED_GROUPS = '425874'
const NOTISEND_PARAMETER_WELCOME = 300291
const NOTISEND_PARAMETER_RESET = 300292
const NOTISEND_TOKEN = 'a0b9de66365e7dabfe152d326e06c846'
const NOTISEND_BASE_URI = 'https://api.notisend.ru/v1'

export const addNotisendRecipient = async (
    group: NOTISEND_ALLOWED_GROUPS,
    email: string,
    code: string
) => {
    const url = `${NOTISEND_BASE_URI}/email/lists/${group}/recipients`
    const parameter_id =
        group === NOTISEND_WELCOME_GROUP
            ? NOTISEND_PARAMETER_WELCOME
            : NOTISEND_PARAMETER_RESET
    const payload = {
        email,
        values: [
            {
                parameter_id,
                value:
                    'https://онлайн-времякарьеры.рф/restore/new-pass/?code=' +
                    code
            }
        ]
    }

    return await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${NOTISEND_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

export const allowedStatuses = ['Школьник', 'Студент', 'Выпускник', 'Молодой специалист']
export const regions = [
    'Республика Адыгея',
    'Республика Башкортостан',
    'Республика Бурятия',
    'Республика Алтай',
    'Республика Дагестан',
    'Республика Ингушетия',
    'Кабардино-Балкарская Республика',
    'Республика Калмыкия',
    'Карачаево-Черкесская Республика',
    'Республика Карелия',
    'Республика Коми',
    'Республика Марий Эл',
    'Республика Мордовия',
    'Республика Саха (Якутия)',
    'Республика Северная Осетия - Алания',
    'Республика Татарстан (Татарстан)',
    'Республика Тыва',
    'Удмуртская Республика',
    'Республика Хакасия',
    'Чеченская Республика',
    'Чувашская Республика - Чувашия',
    'Алтайский край',
    'Краснодарский край',
    'Красноярский край',
    'Приморский край',
    'Ставропольский край',
    'Хабаровский край',
    'Амурская область',
    'Архангельская область',
    'Астраханская область',
    'Белгородская область',
    'Брянская область',
    'Владимирская область',
    'Волгоградская область',
    'Вологодская область',
    'Воронежская область',
    'Ивановская область',
    'Иркутская область',
    'Калининградская область',
    'Калужская область',
    'Камчатский край',
    'Кемеровская область - Кузбасс',
    'Кировская область',
    'Костромская область',
    'Курганская область',
    'Курская область',
    'Ленинградская область',
    'Липецкая область',
    'Магаданская область',
    'Московская область',
    'Мурманская область',
    'Нижегородская область',
    'Новгородская область',
    'Новосибирская область',
    'Омская область',
    'Оренбургская область',
    'Орловская область',
    'Пензенская область',
    'Пермский край',
    'Псковская область',
    'Ростовская область',
    'Рязанская область',
    'Самарская область',
    'Саратовская область',
    'Сахалинская область',
    'Свердловская область',
    'Смоленская область',
    'Тамбовская область',
    'Тверская область',
    'Томская область',
    'Тульская область',
    'Тюменская область',
    'Ульяновская область',
    'Челябинская область',
    'Забайкальский край',
    'Ярославская область',
    'Москва',
    'Санкт-Петербург',
    'Еврейская автономная область',
    'Ненецкий автономный округ',
    'Ханты-Мансийский автономный округ - Югра',
    'Чукотский автономный округ',
    'Ямало-Ненецкий автономный округ',
    'Республика Крым',
    'Севастополь'
].sort()