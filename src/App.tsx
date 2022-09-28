import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Table from './components/Table'
import TableItem from './components/TableItem'
import {getData} from './service/data'

import {useDispatch} from 'react-redux'
import {getTableData} from './slice/tableSlice'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        getData().then(data => {
            dispatch(getTableData(data))
        })
    }, [])

  return (
      <div className="container">
        <div className="row my-3">
          <div className="col-12 text-center">
            <h2>Table Component</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Table />} />
                    <Route path='/project/:projectId' element={<TableItem />} />
                </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
  )
}

export default App
