import {configureStore} from '@reduxjs/toolkit'
import tableReducer from '../slice/tableSlice'

export const store = configureStore({
    reducer: {
        tableData: tableReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch