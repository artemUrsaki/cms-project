export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

export interface Error {
    [ key: string ]: string[]
}
