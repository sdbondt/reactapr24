import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getQueryString,
  setSearchParams,
  useGetTasksQuery,
} from "../../services/taskSlice"
import Button from "../UI/Button"

// TaskPagination handles the UI for navigating through paginated task data.
const TaskPagination = () => {
  // Retrieves the current query string used to fetch tasks.
  const queryString = useSelector(getQueryString)
  // Fetches task data including current page and maximum page count.
  const { data: { page = 1, maxPage = 1 } = {} } = useGetTasksQuery(queryString)
  const dispatch = useDispatch()

  // Dispatches action to navigate to the first page.
  const goToFirstPage = () => dispatch(setSearchParams({ page: 1 }))
  // Dispatches action to navigate to the last page.
  const goToLastPage = () => dispatch(setSearchParams({ page: maxPage }))
  // Dispatches action to navigate to the next page.
  const goToNextPage = () => dispatch(setSearchParams({ page: page + 1 }))
  // Dispatches action to navigate to the previous page.
  const goToPreviousPage = () => dispatch(setSearchParams({ page: page - 1 }))

  // Handles user input to jump directly to a specified page.
  const onPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNum = parseInt(e.target.value)
    if (pageNum >= 1 && pageNum <= maxPage) {
      dispatch(setSearchParams({ page: pageNum }))
    } else {
      dispatch(setSearchParams({ page: 1 }))
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button onClick={goToFirstPage} disabled={page === 1}>
        First
      </Button>
      <Button onClick={goToPreviousPage} disabled={page === 1}>
        Previous
      </Button>
      <input
        type="number"
        value={page}
        onChange={onPageChange}
        className="w-16 text-center border rounded"
        min="1"
        max={maxPage}
      />
      <Button onClick={goToNextPage} disabled={page === maxPage}>
        Next
      </Button>
      <Button onClick={goToLastPage} disabled={page === maxPage}>
        Last
      </Button>
    </div>
  )
}

export default TaskPagination
