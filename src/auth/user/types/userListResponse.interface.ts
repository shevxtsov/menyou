import { TUser } from './user.type'

export interface IUserListResponse {
    users: TUser[]
    total: number
}
