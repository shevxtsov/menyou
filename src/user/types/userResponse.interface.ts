import { TUser } from './user.type'

export interface IUserResponse {
    user: TUser & { token: string }
}
