import { IQueryForList } from 'src/shared/types/queryForList.interface'

export interface IQueryForMealList extends IQueryForList {
    search: string
}
