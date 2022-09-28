import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IData, ISetFilter, ISetSort} from '../share'
import {byField} from '../share/fn';

interface TableState {
    data: IData[]
    sort: ISetSort[]
    filter: ISetFilter[]
}

const initialState: TableState = {
    data: [],
    sort: [],
    filter: []
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        getTableData(state, action: PayloadAction<IData[]>) {
            state.data = action.payload.map((e, index) => {
                return {...e, visible: true, order: index}
            })
        },
        setFilter(state, action: PayloadAction<ISetFilter>) {
            if (!action.payload.value) {
                state.filter = state.filter.filter(e => e.field !== action.payload.field)
                return
            }
            if (!state.filter.some(e => e.field === action.payload.field)) {
                state.filter.push(action.payload)
            } else {
                state.filter = state.filter.map(e => {
                    if (e.field === action.payload.field) {
                        return {
                            field: action.payload.field,
                            value: action.payload.value
                        }
                    } else {
                        return e
                    }
                })
            }
        },
        applyFilter(state) {
            state.data = state.data.map(e => {
                let isVisible: boolean = true
                state.filter.forEach(f => {
                    // @ts-ignore
                    if (e[f.field] !== f.value) {
                        isVisible = false
                    }
                })
                return {...e, visible: isVisible}
            })
        },
        setSort(state, action: PayloadAction<ISetSort>) {
            if (!state.sort.some(e => e.field === action.payload.field)) {
                state.sort.push(action.payload)
                return
            }
            if (state.sort.some(e => e.field === action.payload.field && e.direction === action.payload.direction)) {
                state.sort = state.sort.filter(e => e.field !== action.payload.field)
                return
            }
            state.sort = state.sort.map(e => e.field === action.payload.field ? {...e, direction: action.payload.direction} :  e)
        },
        applySort(state) {
            if (!state.sort.length) {
                state.data = state.data.sort(byField({field: 'order', direction: 'asc'}))
                return
            }
            state.sort.forEach(e => state.data = state.data.sort(byField({field: e.field, direction: e.direction})))
        }
    }
})

export const { getTableData, setFilter, applyFilter, setSort, applySort } = tableSlice.actions
export default tableSlice.reducer