
export interface Error {
    [key: string]: Array<string> | undefined
}

export interface User {
    pk: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string
}