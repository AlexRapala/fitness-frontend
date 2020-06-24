
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

export interface Log {
    id: number,
    name: string,
    created: string,
    owner: number
}

export interface LogXLift {
    id?: number,
    log: number,
    owner: number,
    lift: number,
    sets: number,
    repetitions: number,
    weight: number,
    lifted_date: string
}

export interface Lift {
    id: number,
    name: string
}
