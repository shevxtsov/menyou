import { RoleEntity } from '../role.entity'

export interface IRoleListResponse {
    roles: RoleEntity[]
    total: number
}
