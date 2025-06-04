export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    role: string
}

export type UserInput = Omit<User, 'id'>

export interface Conference {
  id: number
  name: string
  year: number
  editors: string[]
}

export type ConferenceInput = Omit<Conference, 'id'>

export interface ValidationError {
    [ key: string ]: string[]
}
