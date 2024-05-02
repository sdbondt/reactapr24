import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchParams, setSearchParams } from '../../services/taskSlice'
import TaskPagination from './TaskPagination'

const SearchBar = () => {
    const dispatch = useDispatch()
    const { q, direction, limit, page } = useSelector(getSearchParams)
    const onParamsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => dispatch(setSearchParams({ [e.target.name]: e.target.value}))
  return (
    <div className="p-4 bg-white shadow rounded">
            <input 
                type="text" 
                name="q" 
                value={q || ''} 
                onChange={onParamsChange} 
                placeholder="Search tasks..."
                className="mr-2 p-2 border rounded"
            />
            <select 
                name="direction" 
                value={direction || 'asc'} 
                onChange={onParamsChange}
                className="mr-2 p-2 border rounded"
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <select 
                name="limit" 
                value={limit || 10} 
                onChange={onParamsChange}
                className="mr-2 p-2 border rounded"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <TaskPagination />
        </div>
  )
}

export default SearchBar