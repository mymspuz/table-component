import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IData } from '../share'
import { formatPrice, getColor } from '../share/fn'

type TableTrProps = {
    data: IData
}

const TableTr: React.FC<TableTrProps> = ({data}) => {

    const tableColor = `table-${getColor(data.status)}`
    const spanColor = `badge p-2 rounded-pill me-2 shadow bg-${getColor(data.status)}`

    const navigate = useNavigate()

    function handleTrClick(id: number) {
        navigate(`project/${id}`)
    }

    function handleBuyClick(e: any, id: number) {
        e.stopPropagation()
        console.log(`Buy item #${id}`)
    }

    return (
        <tr className={tableColor} onClick={() => handleTrClick(data.id)}>
            <th>
                <span className={spanColor}>
                    <span className="visually-hidden" />
                </span>
                <span className="align-text-top">{data.name}</span>
            </th>
            <td>{data.type}</td>
            <td>{data.conditions}</td>
            <td>$ {formatPrice(data.volume)}</td>
            <td>{data.roi} %</td>
            <td>{data.free}</td>
            <td>{data.hedge} %</td>
            <td>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={(e) => handleBuyClick(e, data.id)}
                >
                    Buy
                </button>
            </td>
        </tr>
    )
}

export default TableTr