import { FilterEntity } from '../filter.entity'

export interface IFilterListResponse {
    filters: FilterEntity[]
    total: number
}
