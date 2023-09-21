export type Align =
    | 'left'
    | 'center'
    | 'right'
    | 'unset'
    | 'initial'
    | 'inherit'
    | 'start'
    | 'end'
    | 'justify'
    | 'match-parent'
    | 'revert'
    | 'revert-layer'

export type PaddingValue = string | number

export interface Padding {
    x?: PaddingValue
    y?: PaddingValue
    top?: PaddingValue
    bottom?: PaddingValue
    left?: PaddingValue
    right?: PaddingValue
}

export type DefaultSizes = 'S' | 'M' | 'L'

export type ExtendedSizes = DefaultSizes | 'XL'

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'
export interface DefaultAJAXResponse {
    ok: boolean
    response?: Record<string, unknown>
    message: string
    error?: string
}

export type ContentType = 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'text/plain'

export interface TransitionReceiver {
    in?: Transition
    out?: Transition
}
export interface TransitionDescriber {
    inFunc: TransitionFunction
    inOptions: TransitionOptions
    outFunc: TransitionFunction
    outOptions: TransitionOptions
}

export type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6
export interface CourseAuthor {
    name: string
    position: string
    photo?: string
}
