import React, { useEffect, useState } from 'react'

import {useAppSelector} from '../hooks/store'
import {useDispatch} from 'react-redux'
import {applyFilter, applySort, setFilter, setSort} from '../slice/tableSlice'

import {IFieldFilterSort, TDirection} from '../share'

type TableThProps = {
    isFilter?: boolean
    allFilter?: boolean
    isSort?: boolean
    caption: string
    field?: IFieldFilterSort
}

const TableTh: React.FC<TableThProps> = (
    {
        isFilter = false,
        allFilter = false,
        isSort = false,
        caption,
        field= {fieldFilter: '', fieldSort: ''}
    }) => {

    const [listFilter, setListFilter] = useState<string[]>([])
    const [allDisabled, setAllDisabled] = useState<boolean>(true)
    const [ascSort, setAscSort] = useState<boolean>(false)
    const [descSort, setDescSort] = useState<boolean>(false)

    const tableBody = useAppSelector(state => state.tableData)
    const dispatch = useDispatch()

    const valueFilter = (): string[] => {
        // @ts-ignore
        return tableBody.data.reduce((acc, obj): string[] => obj.visible && !acc.includes(obj[field.fieldFilter]) ? [...acc, obj[field.fieldFilter]] :  acc, [])
    }

    useEffect(() => {
        if (isFilter) {
            setListFilter(valueFilter())
        }
    }, [])

    useEffect(() => {
        setAllDisabled(!tableBody.filter.some(e => e.field === field.fieldFilter))
        setListFilter(valueFilter())
    }, [tableBody.filter])

    function changeIconSort(direct: TDirection): void {
        if (direct === 'asc') {
            setAscSort(prevState => !prevState)
            setDescSort(false)
        } else {
            setDescSort(prevState => !prevState)
            setAscSort(false)
        }
    }

    function handleFilterClick(value: string): void {
        dispatch(setFilter({field: field.fieldFilter, value: value}))
        dispatch(applyFilter())
    }

    function handleSortClick(direction: TDirection): void {
        dispatch(setSort({field: field.fieldSort, direction}))
        dispatch(applySort())
        changeIconSort(direction)
    }

    return (
        <th scope="col">
            {isFilter && (
            <>
                <button
                    className="btn btn-outline-dark dropdown-toggle btn-sm border border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                />
                <ul className="dropdown-menu">
                    {listFilter && listFilter.map(item => (
                        <li
                            key={item}
                            className="dropdown-item"
                            onClick={() => handleFilterClick(item)}
                        >
                            {item}
                        </li>))}
                </ul>
                {allFilter && (
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleFilterClick('')}
                        disabled={allDisabled}
                    >
                        All
                    </button>
                )}
            </>)}

            <span className="mx-1">{caption}</span>

            {isSort && (
                <>
                    <i
                        className={ascSort ? "bi bi-caret-down-fill" : "bi bi-caret-down"}
                        onClick={() => handleSortClick('asc')}
                    />
                    <i
                        className={descSort ? "bi bi-caret-up-fill" : "bi bi-caret-up"}
                        onClick={() => handleSortClick('desc')}
                    />
                </>
            )}
        </th>
    )
}

export default TableTh