import React from 'react'

import TableTh from './TableTh'
import TableTr from './TableTr'

import { useAppSelector } from '../hooks/store'

const Table: React.FC = () => {

    const tableBody = useAppSelector(state => state.tableData)

    return (
        <>
            {tableBody.data.length && (
            <table className="table">
                <thead>
                    <tr>
                        <TableTh isFilter={true} allFilter={true} isSort={true} caption={'Project'} field={{fieldFilter: 'status', fieldSort: 'name'}} />
                        <TableTh isFilter={true} allFilter={true} caption={'Token type'} field={{fieldFilter: 'type', fieldSort: ''}} />
                        <TableTh caption={'Conditions'} />
                        <TableTh isSort={true} caption={'Volume'} field={{fieldFilter: 'volume', fieldSort: 'volume'}} />
                        <TableTh caption={'ROI'} />
                        <TableTh caption={'Free float'} />
                        <TableTh caption={'Insurance hedge'} />
                        <TableTh caption={''} />
                    </tr>
                </thead>
                <tbody className="fw-bold">
                    {tableBody.data.map(row => row.visible && <TableTr key={row.id} data={row}/>)}
                </tbody>
            </table>
            )}
        </>
    )
}

export default Table