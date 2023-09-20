import { ajax } from 'jquery'
import type {
    ContentType,
    DefaultAJAXResponse,
    ExtendedSizes,
    Padding,
    PaddingValue,
    RESTMethod,
    TransitionDescriber,
    TransitionReceiver
} from '../types'

// Transform the padding value from PaddingValue type to actual CSS
export const applyPadding = (value: PaddingValue): string =>
    typeof value == 'number' ? value + 'em' : value || '0'

// Transform padding values from JS style to CSS (eg. "2em 4em 2em 4em")
// where the order is from top to left clockwise
export const computePadding = (padding: Padding): string => {
    if (
        padding?.top === undefined &&
        padding?.bottom === undefined &&
        padding?.left === undefined &&
        padding?.right === undefined &&
        padding?.x === undefined &&
        padding?.y === undefined
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

interface AJAXOptions {
    method: RESTMethod
    contentType?: ContentType
    data?: FormData | Record<string, string> | null
    csrfToken?: string
    headers?: JQuery.PlainObject<string> | null
}

// Create a plain JSON from FormData
export const transformFormData = (form: FormData): Record<string, unknown> => {
    const object: Record<string, unknown> = {}
    form.forEach((value, key) => (object[key] = value))
    return object
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
        finalData = transformFormData(options.data)
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
        processData: options.contentType === 'multipart/form-data' ? false : true
    })

    request.done((res) => {
        if (res.ok === true) {
            if (callbackSuccess) callbackSuccess(res)
        } else if (res.ok === false) {
            if (callbackError) callbackError(res.error)
            console.error(res)
        } else {
            if (callbackSuccess) callbackSuccess(res)
        }
    })

    request.fail((jqXHR) => {
        if (callbackError)
            callbackError(
                jqXHR.responseJSON && jqXHR.responseJSON.error
                    ? jqXHR.responseJSON.error
                    : jqXHR.responseText
            )
    })
}

const redirectDelay = 500
export const redirect = (location: string) =>
    setTimeout(() => {
        window.location.href = location
    }, redirectDelay)

export const range = (start: number, end: number): number[] => {
    const result = []
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result
}

export const getSequentialPartialIndexes = <T>(arr: T[], size: number): number[][] => {
    const result = []
    let i = 0
    while (i < arr.length) {
        const end = i + size - 1 < arr.length ? i + size - 1 : arr.length - 1
        result.push(range(i, end))
        i += size
    }
    return result
}

// TODO: fix error
export const applyTransitions = (transitions: TransitionReceiver): TransitionDescriber => {
    return {
        inFunc: transitions.in ? transitions.in.func : (): undefined => undefined,
        inOptions: transitions.in ? transitions.in.options : undefined,
        outFunc: transitions.out ? transitions.out.func : (): undefined => undefined,
        outOptions: transitions.out ? transitions.out.options : undefined
    }
}

export const numWord = (value: number, words: string[]) => {
    if (!words.length) throw new Error('Array words is empty')
    else if (words.length >= 3) {
        value = Math.abs(value) % 100
        const num = value % 10
        if (value > 10 && value < 15) return words[2]
        if (num > 1 && num < 5) return words[1]
        if (num == 1) return words[0]
        return words[2]
    }
    return words[0]
}

export const smoothScrollTo = (target: string) => {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}
