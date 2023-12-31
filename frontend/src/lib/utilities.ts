import { ajax } from 'jquery'
import type {
    ContentType,
    DefaultAJAXResponse,
    ExtendedSizes,
    Padding,
    PaddingValue,
    RESTMethod,
    TransitionDescriber,
    TransitionReceiver,
    RangeGenerator
} from '../types'

export const BASE_DOMAIN = 'https://xn----7sbbhpbxldpedi9aeb1qpa7c.xn--p1ai'
export const DEV_DOMAIN = 'http://localhost:4000'

// Create slug from the title
export function formatSlug(input: string): string {
    const date = new Date()
    const tokens = input
        .trim()
        .toLocaleLowerCase()
        .replace(/([^a-z0-9 ])/g, '')
        .replace(/ {2}/g, ' ')
        .trim()
        .split(' ')

    tokens.splice(8)
    tokens.push(
        date.getDate().toString(),
        (date.getMonth() + 1).toString(),
        date.getFullYear().toString()
    )

    return tokens.join('-')
}

// Create a plain JSON from FormData
export function transformFormData(form: FormData): Record<string, unknown> {
    const object: Record<string, unknown> = {}
    form.forEach((value, key) => (object[key] = value))
    return object
}

export const transformBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return '0 Б'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const redirectDelay = 500
export const redirect = (location: string) =>
    setTimeout(() => {
        window.location.href = location
    }, redirectDelay)

const doubleDigit = (num: number): string => (num < 10 ? `0${num}` : num.toString())

export const formatDate = (date: Date): string =>
    `${doubleDigit(date.getDate())}.${doubleDigit(date.getMonth() + 1)}.${date.getFullYear()}`

export function encodeQuery(data: Record<string, string>): string {
    delete data['page']
    const ret = []
    for (const d in data) {
        if (data[d] && data[d] !== '')
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }
    return ret.join('&')
}

/* eslint-disable @typescript-eslint/no-inferrable-types */
export const rangeFrom: RangeGenerator = (from: number, to: number, step: number = 1) => {
    const result = []
    for (let i = from; i < to; i += step) result.push(i)
    return result
}

export const range: RangeGenerator = (to: number, step = 1) => rangeFrom(0, to, step)

// Just the basic random generator
export const random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min) + min)

// Transform the padding value from PaddingValue type to actual CSS
export const applyPadding = (value: PaddingValue): string =>
    typeof value == 'number' ? value + 'em' : value || '0'

// Transform padding values from JS style to CSS (eg. "2em 4em 2em 4em")
// where the order is from top to left clockwise
export const computePadding = (padding: Padding): string => {
    if (
        padding.top === undefined &&
        padding.bottom === undefined &&
        padding.left === undefined &&
        padding.right === undefined &&
        padding.x === undefined &&
        padding.y === undefined
    )
        return undefined

    return [
        applyPadding(padding.top !== undefined ? padding.top : padding.y),
        applyPadding(padding.right !== undefined ? padding.right : padding.x),
        applyPadding(padding.bottom !== undefined ? padding.bottom : padding.y),
        applyPadding(padding.left !== undefined ? padding.left : padding.x)
    ].join(' ')
}

const extendedSizes = ['S', 'M', 'L', 'XL'] as const
const extendedSizeNames = ['small', 'medium', 'large', 'xlarge'] as const

export const getSizeIndex = (size: ExtendedSizes) => extendedSizes.indexOf(size)

export const getSizeName = (size: ExtendedSizes) => extendedSizeNames[getSizeIndex(size)]

export const applyTransitions = (transitions: TransitionReceiver): TransitionDescriber => {
    return {
        inFunc: transitions.in ? transitions.in.func : () => undefined,
        inOptions: transitions.in ? transitions.in.options : undefined,
        outFunc: transitions.out ? transitions.out.func : () => undefined,
        outOptions: transitions.out ? transitions.out.options : undefined
    }
}

export const shuffle = <T>(array: Array<T>): Array<T> => {
    const copy: Array<T> = array
    const result: Array<T> = []
    const length = copy.length
    for (let i = 0; i < length; i++) {
        const removed = copy.splice(random(0, copy.length), 1)[0]
        result.push(removed)
    }
    return result
}

interface AJAXOptions {
    method: RESTMethod
    contentType?: ContentType
    data?: FormData | Record<string, string | string[]> | null
    csrfToken?: string
    headers?: JQuery.PlainObject<string> | null
}

// Функция для отправки AJAX запросов с клиента
export const sendWindowAJAX = (
    url: string,
    options: AJAXOptions = { method: 'GET', contentType: 'application/x-www-form-urlencoded' },
    callbackSuccess?: (res: DefaultAJAXResponse) => void,
    callbackError?: (res: string) => void
) => {
    let finalData: Record<string, unknown> | FormData

    if (!options.contentType) options.contentType = 'application/x-www-form-urlencoded'

    if (
        options.data instanceof FormData &&
        options.contentType === 'application/x-www-form-urlencoded'
    ) {
        finalData = serialize(options.data)
        if (options.csrfToken) finalData.csrf = options.csrfToken
    } else if (options.data && options.data instanceof FormData) {
        finalData = options.data
        if (options.csrfToken) finalData.set('csrf', options.csrfToken)
    }

    const request = ajax({
        url: url,
        contentType: options.contentType === 'multipart/form-data' ? false : options.contentType,
        headers: options.headers || {},
        type: options.method,
        data: finalData,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        processData: options.contentType === 'multipart/form-data' ? false : true
    })

    request.done((res) => {
        if (res.ok === true) {
            if (callbackSuccess) callbackSuccess(res)
        } else if (res.ok === false) {
            if (callbackError) callbackError(res)
            console.error(res)
        } else {
            if (callbackSuccess) callbackSuccess(res)
        }
    })

    request.fail((jqXHR) => {
        if (callbackError)
            callbackError(
                jqXHR.responseJSON && (jqXHR.responseJSON.message || jqXHR.responseJSON.error)
                    ? jqXHR.responseJSON.message || jqXHR.responseJSON.error
                    : jqXHR.responseText
            )
    })
}

type ApplicationMode = 'development' | 'production'

const NODE_ENV: ApplicationMode = 'production'

export const getBaseUrl = (mode: ApplicationMode) =>
    mode == 'production' ? BASE_DOMAIN : DEV_DOMAIN

export const apiRoute = (route: string, url?: string) =>
    `${url || getBaseUrl(NODE_ENV) + '/api'}/${route}`

export const isImage = (extension: string) =>
    ['jpeg', 'jpg', 'png', 'svg'].includes(extension.toLowerCase())

export const getCorrectSum = (sum: string | number, showMark = true) => {
    const mark = '₽'
    const correctSum = Number(sum).toLocaleString(undefined, { minimumFractionDigits: 2 })
    return showMark ? `${correctSum}&nbsp;${mark}` : correctSum
}

export const serialize = (data: FormData) => {
    const obj: Record<string, string | string[]> = {}
    for (const [key, value] of data) {
        if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key].toString()]
            }
            ;(obj[key] as string[]).push(value.toString())
        } else {
            obj[key] = value.toString()
        }
    }
    return obj
}

export const smoothScrollTo = (target: string) => {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

export const BITRIX_ENDPOINT =
    'https://fgaouvo.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.site.form.fill'

export const sendBitrix = (form: HTMLFormElement) => {
    const formOrigin = new FormData(form)
    const formData = new FormData()

    const vals = {
        CONTACT_LAST_NAME: [formOrigin.get('lastName')],
        CONTACT_NAME: [formOrigin.get('firstName')],
        CONTACT_SECOND_NAME: [formOrigin.get('patronimyc')],
        CONTACT_EMAIL: [formOrigin.get('email')],
        CONTACT_PHONE: [formOrigin.get('phone')],
        CONTACT_UF_CRM_CONTACT_1695627928865: [formOrigin.get('region')],
        CONTACT_UF_CRM_CONTACT_1695627949010: [formOrigin.get('status')]
    }

    formData.append('values', JSON.stringify(vals))
    formData.append('properties', '{}')
    formData.append('consents', '{"AGREEMENT_10":"Y"}')
    formData.append('recaptcha', 'undefined')
    formData.append('timeZoneOffset', '-300')
    formData.append('id', '346')
    formData.append('sec', 'fcw38g')
    formData.append('lang', 'ru')
    formData.append(
        'trace',
        '{"url":"https://b24-dl2b2f.bitrix24.site/crm_form_n2pvn/","device":{"isMobile":false},"tags":{"ts":1695384254,"list":{},"gclid":null},"client":{},"pages":{"list":[["https://b24-dl2b2f.bitrix24.site/crm_form_n2pvn/",1695614491,"Регистрация на мероприятие "Время карьер"]]},"gid":null,"previous":{"list":[]}}'
    )
    formData.append('entities', '[]')
    formData.append('security_sign', 'undefined')

    const requestOptions = {
        method: 'POST' as RESTMethod,
        data: formData
    }

    sendWindowAJAX(BITRIX_ENDPOINT, requestOptions)
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
    'город федерального значения Москва',
    'город федерального значения Санкт-Петербург',
    'Еврейская автономная область',
    'Ненецкий автономный округ',
    'Ханты-Мансийский автономный округ - Югра',
    'Чукотский автономный округ',
    'Ямало-Ненецкий автономный округ',
    'Республика Крым',
    'город федерального значения Севастополь',
    'Донецкая Народная Респубика',
    'Иные территории, включая город и космодром Байконур',
    'Луганская Народная Республика',
    'Херсонская область'
].sort()
