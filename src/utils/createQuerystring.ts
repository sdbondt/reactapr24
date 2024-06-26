import { ITaskState } from "../types/TaskTypes"

// Transforms the searchParams object into a queryString.
export const createQuerystring = (searchParams: ITaskState) => {
  const params = new URLSearchParams()

  if (searchParams.q) {
    params.set("q", searchParams.q)
  }

  params.set("page", searchParams.page.toString())
  params.set("direction", searchParams.direction)
  params.set("limit", searchParams.limit.toString())

  return params.toString() ? `?${params.toString()}` : ""
}
