export interface IData {
    id: number
    name: string
    status: TStatus
    type: string
    conditions: string
    volume: number
    roi: number
    free: number
    hedge: number
    visible?: boolean
    order?: number
}

export interface ISetFilter {
    field: string
    value: string
}

export type TDirection = 'asc' | 'desc'

export interface ISetSort {
    field: string
    direction: TDirection
}

export interface IFieldFilterSort {
    fieldFilter: string
    fieldSort: string
}

export type TStatus = 'green' | 'yellow' | 'red'

export type TStatusColor = 'success' | 'warning' | 'danger'