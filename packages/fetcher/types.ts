export interface ObjectLiteral {
    [key: string]: any
}

export interface ConfigWithBody extends Omit<RequestInit, 'body'> {
body?: ObjectLiteral | BodyInit
form?: FormData
}

export interface ErrorWithInfo extends Error {
info?: ObjectLiteral
status?: number
}

