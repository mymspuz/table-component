import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/store'

import { IData } from '../share'

const TableItem: React.FC = () => {

    const params = useParams()
    const projectId = Number(params.projectId)
    const tableData = useAppSelector(state => state.tableData)

    const [item, setItem] = useState<IData>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        const data = tableData.data.filter(e => e.id === projectId)
        data.length ? setItem(data[0]) : setItem(undefined)
        setIsLoading(false)
    }, [tableData.data])

    return (
        <h2>
            {isLoading && 'Loading...'}
            {!isLoading && <>{item ? item.name : 'Project not found!!!'}</>}
        </h2>
    )
}

export default TableItem