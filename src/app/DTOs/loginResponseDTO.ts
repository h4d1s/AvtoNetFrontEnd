import { User } from "../models/user.model"

export interface LoginResponseDTO {
    token: string
    user: User
    userRoles: string[]
}