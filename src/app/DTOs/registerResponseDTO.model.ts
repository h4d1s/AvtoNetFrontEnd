import { User } from "../models/user.model"

export interface RegisterResponseDTO {
    token: string
    user: User
    userRoles: string[]
}